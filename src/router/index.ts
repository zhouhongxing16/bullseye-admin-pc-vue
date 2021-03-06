import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)

 //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
 }
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { hidden: true },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '12321',
      icon: 'HomeOutlined'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'HomeOutlined', affix: true, noCache: true }
      }
    ]
  }
  /*{
    path: '/23',
    name: 'Dashboard333',
    component: Layout,
    redirect: '/dashboard333',
    meta: {
      title: '3333',
      icon: 'HomeOutlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'dashboard333',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard333',
        meta: { title: '首页1333', icon: 'HomeOutlined', affix: false, noCache: true }
      },
      {
        path: 'dashboard33443',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard344433',
        meta: { title: '首页144333', icon: 'HomeOutlined', affix: false, noCache: true }
      }
    ]
  },
  {
    path: '/2',
    name: 'Dashboard3',
    component: Layout,
    redirect: '/dashboard3',
    meta: {
      title: '1',
      icon: 'HomeOutlined'
    },
    children: [
      {
        path: 'd3',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'D3',
        meta: { title: '首页2', icon: 'HomeOutlined', noCache: true },
        children: [
          {
            path: 'd4',
            component: () => import('@/views/dashboard/index.vue'),
            name: 'd4',
            meta: { title: 'dashboard4', icon: 'HomeOutlined', noCache: false }
          },
          {
            path: 'd5',
            component: () => import('@/views/dashboard/index.vue'),
            name: 'd5',
            meta: { title: 'dashboard5', icon: 'HomeOutlined', noCache: false }
          }
        ]
      },
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test1', icon: 'HomeOutlined' },
        children: [
          {
            path: 'test2',
            component: () => import('@/views/test/test.vue'),
            name: 'test2',
            meta: { title: 'test2', icon: 'HomeOutlined', noCache: false }
          },
          {
            path: 'test3',
            component: () => import('@/views/test/test.vue'),
            name: 'test3',
            meta: { title: 'test3', icon: 'HomeOutlined', noCache: false }
          }
        ]
      }
    ]
  }*/
]

export const constantErrorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    name: '/Page404',
    meta: { hidden: true },
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
