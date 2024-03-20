<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabBar" @chang="handleChange"></TabBar>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import TabBar from '@/components/TabBar.vue'
//底部tab栏相关
const useTabBar = () => {
  const state = reactive({
    tabBar: [
      {
        title: '首页',
        to: {
          name: 'home'
        },
        icon: 'home-o'
      },
      {
        title: '我',
        to: {
          name: 'about'
        },
        icon: 'user-o'
      }
    ]
  })
  return toRefs(state)
}
const { tabBar } = useTabBar()

const handleChange = (value) => {
  console.log(value)
}
</script>

<style lang="scss" scoped></style>
