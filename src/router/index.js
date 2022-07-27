import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboardRoutes from '@/modules/dashboard/router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/painel'
  },
  ...dashboardRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
