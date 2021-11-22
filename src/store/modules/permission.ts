import { constantRoutes } from '@/router'
import { getMenusByAccountId } from '@/api/menu'
import Layout from '@/layout/index.vue'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  getMenusByAccountId({ commit }) {
    return new Promise((resolve, reject) => {
      getMenusByAccountId().then(response => {
        const { data } = response
        if (data.success) {
          const res = filterAsyncRoutes(data.data)
          commit('SET_ROUTES', res)
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

function filterAsyncRoutes(routes) {
  const res = []
  const keys = ['path', 'name', 'children', 'redirect', 'meta', 'hidden']
  routes.forEach(item => {
    const newItem = {
      path: null,
      name: null,
      component: null,
      redirect: null,
      meta: {
        title: null,
        icon: null,
        hidden: false,
        alwaysShow: false,
        affix: false,
        noCache: true,
        breadcrumb: true,
        activeMenu: null
      },
      children: []
    }
    if (item.component) {
      // 判断 item.component 是否等于 'Layout',若是则直接替换成引入的 Layout 组件
      if (item.component === 'Layout') {
        newItem.component = Layout
      } else {
        newItem.component = () => import(`@/${item.component}.vue`)
      }
    }
    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key]
      }
    }
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    if (newItem.children && newItem.children.length) {
      newItem.children = filterAsyncRoutes(item.children)
    }
    res.push(newItem)
  })
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
