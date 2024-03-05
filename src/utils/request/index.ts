import { AxiosRequestConfig, AxiosResponse } from 'axios'
import Request from './request'
import { constant } from '@/config'

// 实例化
const req = new Request({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: constant.CONFIG_REQUEST_TIMEOUT_TIME as number,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: AxiosRequestConfig) => config,
    // 响应拦截器 <T = AxiosResponse>(result: T)
    responseInterceptors: <T = AxiosResponse>(result: T) => result,
  },
})

const request = (config: any) => {
  const { method = 'GET' } = config

  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return req.request<any>(config)
}

export default request
