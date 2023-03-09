import type { InternalAxiosRequestConfig } from 'axios'
export default [
    (config: InternalAxiosRequestConfig) => {
        // config.headers['X-Requested-With'] = 'XMLHttpRequest' // setup xhr flag
        // config.withCredentials = true
        // fingerprint(config)
        return config
    },
    (error: any) => {
        if (error) {
            window.$message.error('请求错误')
        }
        return Promise.reject(error)
    },
]
