import { createStore } from 'vuex'
import getters from "./getters"
import user from './modules/user'

// vuex相关配置
export default createStore({
  modules: {
    user
  },
  getters
})
