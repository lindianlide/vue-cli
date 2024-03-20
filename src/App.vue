<template>
  <a-config-provider
    componentSize="middle"
    :locale="locale"
    :theme="{
      token: {
        fontSize: 12,
        controlHeight: 28
      }
    }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive :max="4">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </a-config-provider>
</template>
<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const locale = computed(() => {
  return zhCN
})

// 子应用内部跳转时，通知侧边栏改变菜单状态
// const onRouteChange = () => {
//   if (window.__MICRO_APP_ENVIRONMENT__) {
//     // 发送全局数据，通知侧边栏修改菜单展示
//     window.microApp.setGlobalData({ name: window.__MICRO_APP_NAME__ })
//   }
//}
</script>
