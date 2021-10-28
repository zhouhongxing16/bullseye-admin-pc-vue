import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/:catchAll(.*)',
    name: '/Page404',
    meta: { hidden: true },
    component: () => import('@/views/404.vue')
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
        meta: { title: '首页1', icon: 'HomeOutlined', affix: true, noCache: true }
      }
    ]
  },
  {
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
        meta: { title: '首页1333', icon: 'HomeOutlined', affix: true, noCache: true }
      },
      {
        path: 'dashboard33443',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard344433',
        meta: { title: '首页144333', icon: 'HomeOutlined', affix: true, noCache: true }
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
