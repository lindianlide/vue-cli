<script setup>
import HeaderAvatar from './HeaderAvatar.vue'
import HeaderGlobal from './HeaderGlobal.vue'
import HeaderZoom from './HeaderZoom.vue'
import HeaderSearch from './HeaderSearch.vue'
import HeaderDownload from './HeaderDownload.vue'
import HeaderDocument from './HeaderDocument.vue'
import HeaderNotice from './HeaderNotice.vue'
</script>

<template>
  <a-space size="large">
    <slot name="search">
      <HeaderSearch />
    </slot>
    <slot name="zoom">
      <HeaderZoom />
    </slot>
    <slot name="download">
      <HeaderDownload />
    </slot>
    <slot name="document">
      <HeaderDocument />
    </slot>
    <slot name="customBlock"></slot>
    <slot name="notice">
      <HeaderNotice />
    </slot>
    <slot name="avatar">
      <HeaderAvatar />
    </slot>
    <slot name="global">
      <HeaderGlobal />
    </slot>
  </a-space>
</template>

<style scoped>
:deep(.ant-space-item) :hover {
  cursor: pointer;
}
</style>
