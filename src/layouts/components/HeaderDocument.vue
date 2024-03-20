<script setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getDocuments } from '@/api/admin'

const visible = ref(false)
const content = ref()
const title = ref()

const router = useRouter()
const { t } = useI18n()

const showModal = () => {
  const { meta } = router.currentRoute.value
  if (!meta || !meta.id) return false
  //TODO: menu item name i18n
  if (meta.title) title.value = meta.title.zhCN || meta.title.enUS || ''
  getDocuments({ menuId: meta.id }).then(({ data }) => {
    if (data && data.content) {
      content.value = data.content
      visible.value = true
    } else message.info(t('message.document.noContent'))
  })
}

const onClose = () => {
  visible.value = false
}
</script>
<template>
  <a-tooltip :mouseEnterDelay="1.2" :title="t('tooltip.document')">
    <QuestionCircleOutlined @click="showModal" />
  </a-tooltip>
  <a-drawer size="large" :title="title" v-model:open="visible" @close="onClose">
    <div class="w-e-text" v-html="content"></div>
  </a-drawer>
</template>
