import defaultSettings from '@/settings'
import Cookies from "js-cookie";

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: Cookies.get('theme') == 'dark' ? 'dark': 'light',
  fixedHeader: fixedHeader, //
  tagsView: tagsView,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state: any, { key, value }: any) => {
    if (state.prototype.hasOwnProperty.call(this, key)) {
      state[key] = value
    }
  },
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
