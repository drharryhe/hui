import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: () => import('/src/views/About.vue'),
    },
    // {
    //     path: '/code',
    //     component: () => import('/src/views/CodeViewer.vue'),
    // },
    {
        path: '/tabs',
        component: () => import('/src/views/TabsPanel.vue'),
    },
    {
        path: '/input',
        component: () => import('/src/views/InputPanel.vue'),
    },
    {
        path: '/table',
        component: () => import('/src/views/TablePanel.vue'),
    },
    {
        path: '/list',
        component: () => import('/src/views/ListPanel.vue'),
    },
    {
        path: '/bar',
        component: () => import('/src/views/BarPanel.vue'),
    },
    {
        path: '/toggle',
        component: () => import('/src/views/TogglePanel.vue'),
    },
    {
        path: '/code',
        component: () => import('/src/views/CodePanel.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
