import axios from 'axios'
import store from '@/store'

// axios初始化及相关设置
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// axios请求设置
service.interceptors.request.use(
  config => {
    // 请求headers带上token
    if (store.getters.token != '') {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
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
    const res = response.data
    return res
  },
  error => {
    console.log('error:' + error)
    return Promise.reject(error)
  }
)

export default service
