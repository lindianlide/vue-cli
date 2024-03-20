<script setup>
import { BellOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <a-tooltip :mouseEnterDelay="1.2" :title="t('tooltip.notice')">
    <BellOutlined />
  </a-tooltip>
</template>
