import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import store from "./store"
import router from './router'

NProgress.configure({ showSpinner:false })

const whiteList = ['/login']

router.beforeEach(async(to: any, from: any, next: any) => {
  // 开启页面进度条
  NProgress.start()

  const hasToken = getToken()

  // 判断token的情况
  if (hasToken && hasToken !== '') {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getAccountInfo')
          const accessRoutes = await store.dispatch('permission/getMenusByAccountId')
          accessRoutes.forEach(value => {
            router.addRoute(value)
          })

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // Message.error(error || 'Has Error')
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: any, from: any, next: any) => {
  NProgress.done()
})
