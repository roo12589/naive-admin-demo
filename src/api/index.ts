import { Api } from '@/types'
import axios from 'axios'
import req from './interceptor/request'
import res from './interceptor/response'
const [requestResolve, requestReject] = req
const [responseResolve, responseReject] = res

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10 * 1000,
    headers: {
        token: localStorage.getItem('token') || '',
    },
})

request.interceptors.request.use(requestResolve, requestReject)
request.interceptors.response.use(responseResolve, responseReject)

const CancelToken = axios.CancelToken
export function useCancelToken(fetcher) {
    let abort
  
    function send(data, config) {
      cancel() // 主动取消
  
      const cancelToken = new CancelToken(cancel => (abort = cancel))
      return fetcher(data, { ...config, cancelToken })
    }
  
    function cancel(message = 'abort') {
      if (abort) {
        abort(message)
        abort = null
      }
    }
  
    return [send, cancel]
  }
/* 使用

function getUser(id: string, config?: AxiosRequestConfig) {
  return request(`api/user/${id}`, config)
}

// 包装请求函数
const [fetchUser, abortRequest] = withCancelToken(getUser)

// 发送请求
// 如果上一次请求还没回来，会被自动取消
fetchUser('1000')

// 通常不需要主动调用
// 但可以在组件销毁的生命周期中调用
abortRequest() */

export default request
