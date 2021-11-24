import defaultSettings from '@/settings'
import Cookies from "js-cookie";

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: Cookies.get('theme') == 'dark' || !Cookies.get('theme') ? 'dark': 'light', // 菜单主题色
  fixedHeader: fixedHeader, // 页面上部悬浮
  tagsView: tagsView, // 是否开启tags
  sidebarLogo: sidebarLogo // 是否开启logo
}

const mutations = {
  // 更改设置
  CHANGE_SETTING: (state: any, { key, value }: any) => {
    if (state.prototype.hasOwnProperty.call(this, key)) {
      state[key] = value
    }
  },
  // 变更菜单主题色
  CHANGE_THEME: (state: any, data: any) => {
    state.theme = data
    Cookies.set('theme', data)
  }
}

const actions = {
  changeSetting({ commit }: any, data: any) {
    commit('CHANGE_SETTING', data)
  },
  changeTheme({ commit }: any, data: any) {
    commit('CHANGE_THEME', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
