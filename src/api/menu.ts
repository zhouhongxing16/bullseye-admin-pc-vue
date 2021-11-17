import request from '@/utils/request'

export function getMenusByAccountId() {
  return request({
    url: '/menu/getMenusByAccountId',
    method: 'get'
  })
}
