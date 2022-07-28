import goodsRoutes from './../modules/goods/router'

const Home = () => import('../views/Home.vue')

export default [
   {
      path: '',
      component: () => import('@/Layouts/Dashboard'),
      children: [
         {
            path: '/painel',
            name: 'dashboard',
            component: Home,
            children: [
               ...goodsRoutes
            ]
         }
      ]
   }
]
