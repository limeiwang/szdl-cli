import { createRouter, createWebHistory } from 'vue-router'

export const routerHistory = createWebHistory()

const routers = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/Home.vue')
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('@/views/About.vue')
    }
  ]
})

export { routers }