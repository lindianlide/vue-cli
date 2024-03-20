<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

import { CloseCircleFilled } from '@ant-design/icons-vue'

import { startsWithSlash } from '@/utils'
import { tagNavigation, language } from '@/utils/storage'

const tagNavigationSessionItems = sessionStorage.getItem('tagNavigations')

const navigations = ref(tagNavigationSessionItems ? JSON.parse(tagNavigationSessionItems) : [])
const activeKey = ref()

const router = useRouter()

watch(
  navigations,
  (value) => {
    const activeItem = value.find((x) => x._active)
    if (null == activeItem) return
    activeKey.value = activeItem ? activeItem.id || activeItem.key : undefined
    router.push({ path: startsWithSlash(activeItem.route) })
  },
  { immediate: true }
)

const setName = (row) => {
  const currentLanguage = language.getItem()
  return row.english && currentLanguage && currentLanguage.startsWith('en') ? row.english : row.name
}

const redirect = (item) => {
  tagNavigation.addItem(item)
}

const close = (item) => {
  tagNavigation.removeItem(item)
}

const storageListener = ({ detail }) => {
  navigations.value = detail
}

onMounted(() => {
  document.addEventListener('customStorage', storageListener)
})

onBeforeUnmount(() => {
  document.removeEventListener('customStorage', storageListener)
})
</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane v-for="item in navigations" :key="item.id">
      <template #tab>
        <div class="c-flex">
          <div @click="redirect(item)">{{ setName(item) }}</div>
          <div class="c-close" @click.stop="close(item)">
            <close-circle-filled />
          </div>
        </div>
      </template>
    </a-tab-pane>
    <template #renderTabBar="{ DefaultTabBar, ...props }">
      <component :is="DefaultTabBar" v-bind="props" />
    </template>
  </a-tabs>
</template>

<style lang="less" scoped>
.c-flex {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding-left: 4px;
}
.c-close {
  display: flex;
  font-size: small;
  color: var(--vt-c-divider-light-1);
  justify-content: right;
  align-items: center;
  flex-flow: row nowrap;
  margin-left: 4px;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  .anticon {
    margin: 0;
  }
}

.ant-tabs {
  line-height: 1.888;
  margin-left: 12px;
}
</style>
