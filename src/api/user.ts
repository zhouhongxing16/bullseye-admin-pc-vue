import request from '@/utils/request'

export function login(data:any) {
  return request({
    url: '/login/adminLogin',
    method: 'post',
    data
  })
}

export function getAccountInfo() {
  return request({
    url: '/account/getMyAccountInfo',
    method: 'get'
  })
}
