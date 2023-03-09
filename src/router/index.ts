import { createRouter, createWebHistory } from 'vue-router'
import { asyncRoutes } from './routes'
const router = createRouter({
    history: createWebHistory(),
    routes: asyncRoutes,
    // scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
