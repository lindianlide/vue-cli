import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import i18n from './config/i18n'

import SelfDesignVue from 'self-design-vue'
import 'self-design-vue/lib/style.css'
import '@/assets/main.less'
import '@/assets/layout.less'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(SelfDesignVue)
app.use(i18n)

app.mount('#app-outsource')
