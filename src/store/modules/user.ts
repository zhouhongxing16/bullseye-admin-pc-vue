import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getIdKey, setIdKey, removeIdKey } from '@/utils/auth'

const getDefaultState = () => {
  return {
    id: getIdKey(),
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state:any) => {
    Object.assign(state, getDefaultState())
  },
  SET_ID: (state:any, id:any) => {
    state.id = id
  },
  SET_TOKEN: (state:any, token:any) => {
    state.token = token
  },
  SET_NAME: (state:any, name:any) => {
    state.name = name
  },
  SET_AVATAR: (state:any, avatar:any) => {
    state.avatar = avatar
  },
  SET_ROLES: (state:any, roles:any) => {
    state.roles = roles
  }
}


const actions = {
  login({ commit }:any, userInfo:any) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        if (response.success) {
          commit('SET_TOKEN', data.token)
          commit('SET_ID', data.id)
          setToken(data.token)
          setIdKey(data.id)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }:any) {
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(response => {
        const { data } = response

        if (!data) {
          reject('登录失败，请重试')
        }

        const { roles, name, avatar } = data

        if (!roles || roles.length <= 0) {
          reject('未获取到用户权限!')
        }

        commit('SET_ROLES', roles.split(','))
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit }:any) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeIdKey()
      commit('RESET_STATE')
    })
  },
  resetToken({ commit }:any) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
