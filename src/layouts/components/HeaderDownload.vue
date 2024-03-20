<script setup>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const onClick = () => {
  router.push('/admin/download')
}
</script>
<template>
  <a-tooltip :mouseEnterDelay="1.2" :title="t('tooltip.download')">
    <DownloadOutlined @click="onClick" />
  </a-tooltip>
</template>
