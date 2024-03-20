import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import { language } from '@/utils/storage'

// const modules = import.meta.globEager("@/locales/**/*.json");

import enUS from '@/locales/enUS.json'
import zhCN from '@/locales/zhCN.json'

const messages = {
  zhCN: zhCN,
  enUS: enUS
}

export default createI18n({
  legacy: false,
  locale: language.getItem(),
  messages
})
