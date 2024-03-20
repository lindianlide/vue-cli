<script setup>
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { RouterView } from 'vue-router'

import HeaderBlock from './components/HeaderBlock.vue'
import HeaderNavigation from './components/HeaderNavigation.vue'
import SiderMenu from './components/SiderMenu.vue'

const collapsed = ref(false)
</script>
<template>
  <a-layout class="container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="sider">
      <div class="logo">
        <div>logo</div>
      </div>
      <SiderMenu class="menu"></SiderMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <div class="header-content">
          <slot name="navigation" class="header-navigation">
            <HeaderNavigation />
          </slot>
          <slot name="block" class="header-block">
            <HeaderBlock />
          </slot>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
@header-height: 50px;
@default-padding-md: 16px; // small containers and buttons
@default-padding-sm: 12px; // Form controls and items
@default-padding-xs: 8px; // small items
@default-padding-xss: 4px; // more small

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .sider {
    .logo {
      height: @header-height;
      margin: 0 @default-padding-md;
      position: sticky;
    }

    .menu {
      height: calc(100% - @header-height);
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }

  .header {
    padding: 0 @default-padding-md;
    width: 100%;
    height: @header-height;
    line-height: @header-height;
    background-color: #ffffff;
    display: flex;

    .header-content {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
  }

  .trigger {
    font-size: 18px;
    line-height: @header-height;
    padding: 0 @default-padding-md;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .content {
    width: calc(100% - @default-padding-md - @default-padding-md);
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: @default-padding-xs;
    margin: @default-padding-md;
    padding: @default-padding-md;
    background-color: #ffffff;
    overflow: auto;
  }
}
</style>
