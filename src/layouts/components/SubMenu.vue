<script setup>
import { Menu } from 'ant-design-vue'

// eslint-disable-next-line vue/no-dupe-keys
import { language } from '@/utils/storage'

const props = defineProps({
  ...Menu.SubMenu.props,
  // Cannot overlap with properties within Menu.SubMenu.props
  menuInfo: {
    type: Object,
    default: () => ({})
  },
  language: {
    type: String,
    default: language.getItem()
  }
})

const setName = (row) => {
  const currentLanguage = props.language
  return row.english && currentLanguage && currentLanguage.startsWith('en') ? row.english : row.name
}

const getIconName = (row) => {
  return row.icon ? row.icon.replace('icon-', '') : 'appstore'
}
</script>

<template>
  <a-sub-menu :key="menuInfo.id">
    <template #icon>
      <c-icon :display-name="getIconName(menuInfo)" />
    </template>
    <template #title>
      <a-tooltip :title="setName(menuInfo)" placement="right" :mouseEnterDelay="1">
        {{ setName(menuInfo) }}
      </a-tooltip>
    </template>
    <template v-for="item in menuInfo.children" :key="item.id">
      <template v-if="item.children && item.children.length">
        <sub-menu :menu-info="item" :key="item.id" />
      </template>
      <template v-else>
        <a-menu-item :key="item.id">
          <template #icon>
            <c-icon :display-name="getIconName(item)" />
          </template>
          <a-tooltip :title="setName(item)" placement="right" :mouseEnterDelay="1">
            {{ setName(item) }}
          </a-tooltip>
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<style scoped>
.c-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
