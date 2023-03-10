import { dashboardRoutes } from './dashboard'

export const baseRoutes = [
    {
        path: '/',
        redirect: '/login',
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
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
    },
]

export const asyncRoutes = [...baseRoutes, ...dashboardRoutes]
