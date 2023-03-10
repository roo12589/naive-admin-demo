// import config from "@/config"
// import router from "@/router"
// import store from "@/store"

import type { AxiosResponse } from "axios"

export default [
    (response: AxiosResponse) => {

        if (response.data.errcode === 0) {
            return response.data
            // 10002002 token失效
        } else if (response.data.errcode === 10002002) {
            // store.commit("user/cleanToken")
            // redirectSSO()
            throw response.data
            // 10002003 系统无权限
        } else if (response.data.errcode === 10002003) {
            // router.replace("/error/403")
            throw new Error(response.data.msg)
        }
        return response
    },
    (error: any) => {
        return Promise.reject(error)
    },
]
