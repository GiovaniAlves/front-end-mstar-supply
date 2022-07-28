const GoodsHome = () => import('../views/GoodsHome.vue')
const GoodsForm = () => import('../views/GoodsForm.vue')

export default [
   {
      path: 'mercadorias',
      name: 'goods',
      component: GoodsHome
   },
   {
      path: 'mercadorias/cadastrar',
      name: 'goodsCreate',
      component: GoodsForm
   },
   {
      path: 'mercadorias/:id',
      name: 'goodsEdit',
      component: GoodsForm
   }
]
