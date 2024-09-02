import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/query',
    name: 'query',
    component: () => import('../views/QueryView.vue')
  },
  {
    path: '/script/querychange',
    name: 'query-change',
    component: () => import('../views/script/querychange.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
