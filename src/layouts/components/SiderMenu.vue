<script setup>
import { reactive, ref } from 'vue'
import { arrayToTree } from 'performant-array-to-tree'
import { useRouter } from 'vue-router'

import { storedMenus } from '@/utils/menu'
import { startsWithSlash } from '@/utils'
import { tagNavigation, language } from '@/utils/storage'

const selectedKeys = reactive([])
const openKeys = reactive([])

const menus = ref([])
const computedMenus = ref([])

;(async () => {
  const result = await storedMenus()
  menus.value = result
  computedMenus.value = arrayToTree(menus.value, { dataField: null })
})()
Object.freeze(menus.value)

const router = useRouter()

const select = (event) => {
  const row = menus.value.find((x) => x.id && x.id == event.key)
  if (!row) return false
  const route = row.route
  if (!route) return false
  router.push({ path: startsWithSlash(route) })
  tagNavigation.addItem(row)
}

const currentLanguage = ref(language.getItem())

const setName = (row) => {
  return row.english && currentLanguage.value && currentLanguage.value.startsWith('en')
    ? row.english
    : row.name
}

const getIconName = (row) => {
  return row.icon ? row.icon.replace('icon-', '') : 'appstore'
}

const openChange = () => {}
</script>
<template>
  <div>
    <c-icon display-name="appstore" />
    <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      :openKeys="openKeys"
      :forceSubMenuRender="false"
      @select="select"
      @openChange="openChange"
    >
      <template v-for="item in menus" :key="item.id">
        <a-menu-item>
          <template #icon>
            <c-icon :display-name="getIconName(item)" />
          </template>
          <a-tooltip :title="setName(item)" placement="right" :mouseEnterDelay="1">
            {{ setName(item) }}
          </a-tooltip>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
