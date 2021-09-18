import request from '@/utils/request'

export function login(data:any) {
  return request({
    url: '/login/adminLogin',
    method: 'post',
    data
  })
}

export function getInfo(id:string) {
  return request({
    url: '/account/getAccount/' + id,
    method: 'get'
  })
}
