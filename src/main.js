import 'vant/lib/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './config/i18n'

import {
  Button,
  Cell,
  Form,
  Field,
  CellGroup,
  Notify,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Tag,
  Dialog,
  Grid,
  PullRefresh,
  Collapse,
  CollapseItem,
  Uploader,
  Picker,
  Radio,
  RadioGroup,
  Signature,
  Calendar,
  ImagePreview,
  Image as VanImage,
  Col,
  Row,
  DropdownMenu,
  DropdownItem
} from 'vant'
import 'amfe-flexible' //rem转化的工具
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.use(Button)
app.use(Cell)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Notify)
app.use(Popup)
app.use(Toast)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(Tag)
app.use(Dialog)
app.use(PullRefresh)
app.use(Grid)
app.use(Collapse)
app.use(CollapseItem)
app.use(Uploader)
app.use(Picker)
app.use(Radio)
app.use(RadioGroup)
app.use(Signature)
app.use(VanImage)
app.use(Calendar)
app.use(ImagePreview)
app.use(Col)
app.use(Row)
app.use(DropdownMenu)
app.use(DropdownItem)

app.mount('#app')
