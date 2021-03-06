import { createStore } from 'vuex'
import getters from "./getters"
import app from './modules/app'
import user from './modules/user'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

// vuex相关配置
export default createStore({
  modules: {
    app,
    user,
    settings,
    tagsView,
    permission
  },
  getters
})
