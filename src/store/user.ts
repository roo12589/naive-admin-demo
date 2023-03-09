import { getUser } from '@/api/user.api'
import router from '@/router'
import { removeToken } from '@/utils/token'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state() {
        return {
            userInfo: {},
        }
    },
    getters: {
        userId(state) {
            return this.userInfo?.id
        },
        name(state) {
            return this.userInfo?.name
        },
        avatar(state) {
            return this.userInfo?.avatar
        },
        role(state) {
            return this.userInfo?.role || []
        },
    },
    actions: {
        async getUserInfo() {
            try {
                const res: any = await getUser()
                if (res.code === 0) {
                    const { id, name, avatar, role } = res.data
                    this.userInfo = { id, name, avatar, role }
                    return Promise.resolve(res.data)
                } else {
                    return Promise.reject(res)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async logout() {
            removeToken()
            this.userInfo = {}
            router.replace({ path: '/login' })
        },
        setUserInfo(userInfo = {}) {
            this.userInfo = { ...this.userInfo, ...userInfo }
        },
    },
})
