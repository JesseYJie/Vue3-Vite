import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { RequestConfig, RequestInterceptors } from './types'
import { userStore } from '@/store/user'
import { storage } from '@/utils'
import Store from '@/store'
import { constant } from '@/config'
import router from '@/router'
let loading = '' as any;

const store = userStore(Store)

class Request {
  // axios实例
  instance: AxiosInstance

  // 拦截器对象
  interceptorsObj?: RequestInterceptors

  constructor(config: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 类请求拦截器
    this.instance.interceptors.request.use(
      (req: any) => {
        const token = storage.getItem(constant.CONFIG_TOKEN)

        if (token) {
          // 如果有token给请求头加上
          req.headers.Authorization = `Bearer ${token}`
          req.timeout = constant.CONFIG_REQUEST_TIMEOUT_TIME
        }
        return req
      },
      (err: any) => {
        console.log(err)
      }
    )

    // 类响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data: resData, status } = res

        if (status == constant.CONFIG_CODE_SUCCESS && resData && Object.prototype.toString.call(resData) == '[object Object]') {
          resData.Success = false
          resData.Code == constant.CONFIG_CODE_SUCCESS && (resData.Success = true)
        }
        return resData
      },
      (err: any) => {
        console.log('err::', err)
        // 根据自己业务/接口返回做相应调整
        const { status } = err.response

        switch (status) {
          case 401:
            // @ts-ignore
            ElMessage.warning('登录信息已失效，请重新登录!')
            storage.removeItem(constant.CONFIG_TOKEN)
            store.$patch((state) => {
              state.isLogin = false
            })
            router.push({ path: '/login' })
            break
          default:
        }
        const { Code } = err.response.data

        switch (Code) {
          case 401:
            // @ts-ignore
            ElMessage.warning('登录信息已失效，请重新登录!')
            storage.removeItem(constant.CONFIG_TOKEN)
            store.$patch((state) => {
              state.isLogin = false
            })
            router.push({ path: '/login' })
            break
          default:
        }
      }
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      loading = ElLoading.service({
        lock: true,
        background: 'rgba(255,255, 255, 0.3)',
        body: true
      })
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        }).finally(() => {
          if (loading) {
            loading.close()
            loading = ''
          }
        })
    })
  }
}

export default Request
