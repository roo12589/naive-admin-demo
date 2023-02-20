import { RouteRecord, RouteRecordRaw } from 'vue-router'
import { dashboardRoutes } from './dashboard'

 const baseRoutes = [
    {
        path:"/",
        redirect:"/error/404",
    },
    {
        name: 'error',
        path: '/error/404',
        hidden: true,
        meta: {
            title: '错误',
        },
        component: () => import('@/views/error/404.vue'),
    },
]

export const routes = [
    ...baseRoutes,
    ...dashboardRoutes
]

export default routes