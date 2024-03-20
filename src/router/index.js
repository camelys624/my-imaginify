import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/LayoutView.vue'
import { menuList } from './menu.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: menuList
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    }
  ]
})

export default router
