import { createApp, nextTick } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '@/styles/index.scss'

import '@/permission'

// 滚动条
import CScrollbar from 'c-scrollbar'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(Antd)
  .use(CScrollbar)
  .mount("#app")
