import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue';
import router from "@/router";
import NProgress from 'nprogress'

// axios初始化及相关设置
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// axios请求设置
service.interceptors.request.use(
  config => {
    // 请求headers带上token
    if (store.getters.token && store.getters.token != '') {
      //config.headers['Authorization'] = 'Bearer ' + store.getters.token
      config.headers['token'] = store.getters.token
    }
    return config
  },
  error => {
    console.log('error:' + error)
    return Promise.reject(error)
  }
)
// axios返回处理设置
service.interceptors.response.use(
  response => {
    const res = response
    if (res.status == 401) {
      message.warning("登录失效，重新登录")
    } else if (res.status == 500) {
      message.error("服务器错误！")
    } else if (res.status == 404) {
      message.error("404 Not Found")
    } else if (res.status == 200) {
      if(!response.data.success){
        message.error(res.data.message)
      }
      return res
    } else {
      message.error("UnKnow!")
    }
  },
  error => {
    console.log('error:' + error.response.status)
    const status = error.response.status
    if (status == 401) {
      message.warning("登录失效，请重新登录！")
      NProgress.done()
      store.dispatch('user/logout')
      router.replace({
        path: 'login'
      })
    } else if (status == 500) {
      message.error("服务器错误！")
    } else if (status == 404) {
      message.error("404 Not Found")
    }
    return Promise.reject(error)
  }
)

export default service
