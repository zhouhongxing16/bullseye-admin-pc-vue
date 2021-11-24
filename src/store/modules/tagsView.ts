const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  // 添加展示tag
  ADD_VISITED_VIEW: (state: any, view: any) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  // 添加需要缓存的页面
  ADD_CACHED_VIEW: (state: any, view: any) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 删除展示tag
  DEL_VISITED_VIEW: (state: any, view: any) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  // 删除需要缓存的页面
  DEL_CACHED_VIEW: (state: any, view: any) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 关闭其他展示tag，除了affix页面
  DEL_OTHERS_VISITED_VIEWS: (state: any, view: any) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  // 删除其他需要缓存的页面
  DEL_OTHERS_CACHED_VIEWS: (state: any, view: any) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  // 关闭所有的tag，除了affix页面
  DEL_ALL_VISITED_VIEWS: (state: any) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  // 删除所有缓存页面
  DEL_ALL_CACHED_VIEWS: (state: any) => {
    state.cachedViews = []
  },
  // fullPath发生变化时，变更展示tag
  UPDATE_VISITED_VIEW: (state: any, view: any) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  // 添加tag
  addView({ dispatch }: any, view: any) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }: any, view: any) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }: any, view: any) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 删除tag
  delView({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  // 删除其他tag
  delOthersViews({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  // 删除所有tag
  delAllViews({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  // 修改tag信息
  updateVisitedView({ commit }: any, view: any) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
