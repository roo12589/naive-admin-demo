import { dashboardRoutes } from './dashboard'

export const baseRoutes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        redirect: '/404',
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
]
// modules文件夹下的路由都会作为动态路由
// const modules = import.meta.globEager('./modules/*.js')
// const asyncRoutes = []
// Object.keys(modules).forEach((key) => {
//   asyncRoutes.push(...modules[key].default)
// })
export const asyncRoutes = [...baseRoutes, ...dashboardRoutes]
