import { defineStore } from 'pinia'
import { baseRoutes, asyncRoutes } from '@/router/routes'

function hasPermission(route, roles: any[]) {
    const routeRole = route.meta?.role ? route.meta.role : []
    if (!routeRole.length || !roles.length) return false
    return roles.some((role) => routeRole.includes(role))
}

function filterAsyncRoutes(routes: any[] = [], role) {
    const res: any = []
    routes.forEach((route: any) => {
        if (hasPermission(route, role)) {
            const currentRoute = {
                ...route,
                children: [],
            }
            if (route.children && route.children.length) {
                currentRoute.children = filterAsyncRoutes(route.children, role)
            } else {
                Reflect.deleteProperty(currentRoute, 'children')
            }
            res.push(currentRoute)
        }
    })
}

export const usePermissionStore = defineStore('permission', {
    state() {
        return {
            accessRoutes: [],
        }
    },
    getters: {
        routes(state): any[] {
            return baseRoutes.concat(state.accessRoutes)
        },
        menus() {
            return this.routes.filter((route) => route.name && !route.isHidden)
        },
    },
    actions: {
        initRoutes(role = []) {
            const accessRoutes: any = filterAsyncRoutes(asyncRoutes, role)
            this.accessRoutes = accessRoutes
            return accessRoutes
        },
    },
})
