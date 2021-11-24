import Cookies from 'js-cookie'

// sidebar管理
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+ Cookies.get('sidebarStatus') : true, // 伸缩状态
    withoutAnimation: false // 无动画
  },
  device: 'desktop', // 模式
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  // 模式切换
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  // 关闭sidebar
  CLOSE_SIDEBAR: (state: any, withoutAnimation: any) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: any, device: any) => {
    state.device = device
  },
  SET_SIZE: (state: any, size: any) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: any, device: any) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }: any, size: any) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
