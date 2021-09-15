import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token:any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const IdKey = 'id'

export function getIdKey() {
  return Cookies.get(IdKey)
}

export function setIdKey(id:any) {
  return Cookies.set(IdKey, id)
}

export function removeIdKey() {
  return Cookies.remove(IdKey)
}
