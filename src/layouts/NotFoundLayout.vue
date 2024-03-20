<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const redirect = () => router.push({ path: '/' })
console.log('window', window)
</script>
<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="redirect"> Back Home </a-button>
    </template>
  </a-result>
</template>
