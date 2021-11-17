import { constantRoutes } from '@/router'
import { getMenusByAccountId } from '@/api/menu'

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
          filterAsyncRoutes(data.data)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

function filterAsyncRoutes(routes) {
  console.log(routes)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
