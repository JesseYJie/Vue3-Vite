import { request } from '@/utils'
// 获取用户登录
export const loginApi = (data: any) =>
  request({
    url: '/api/user/users/login',
    method: 'POST',
    data,
  })

// 获取当前用户信息
export const getCurrUserApi = () =>
  request({
    url: '/api/user/users/current',
    method: 'GET',
  })
