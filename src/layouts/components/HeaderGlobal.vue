<script setup>
import { GlobalOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { language } from '@/utils/storage'
const languages = [
  { name: 'EN', label: 'English', value: 'enUS' },
  { name: 'CN', label: '简体中文', value: 'zhCN' }
]

const router = useRouter()
const selectedKeys = reactive([language.getItem()])
const setLanguage = (value) => {
  language.setItem(value)
  router.go(0)
}
</script>
<template>
  <a-dropdown placement="bottomLeft">
    <div class="c-global">
      <GlobalOutlined />
    </div>
    <template #overlay>
      <slot name="overlay">
        <a-menu v-model:selectedKeys="selectedKeys">
          <a-menu-item v-for="item in languages" :key="item.value" @click="setLanguage(item.value)">
            <a href="javascript:;">
              <span class="c-label">{{ item.name }}</span>
              <span>{{ item.label }}</span>
            </a>
          </a-menu-item>
        </a-menu>
      </slot>
    </template>
  </a-dropdown>
</template>
<style lang="less" scoped>
.c-global {
  font-size: 120%;
}
.c-label {
  font-size: 70%;
  margin-right: 6px;
}
.ant-dropdown-menu {
  padding: 4px 0;
  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
