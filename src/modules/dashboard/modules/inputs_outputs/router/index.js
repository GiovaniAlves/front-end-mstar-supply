const InputOutputHome = () => import('../views/InputOutputHome.vue')
const InputOutputForm = () => import('../views/InputOutputForm.vue')

export default [
   {
      path: 'entradas_saidas',
      name: 'inputs_outputs',
      component: InputOutputHome
   },
   {
      path: 'entradas_saidas/cadastrar',
      name: 'inputs_outputsCreate',
      component: InputOutputForm
   },
   {
      path: 'entradas_saidas/:id',
      name: 'inputs_outputsEdit',
      component: InputOutputForm
   }
]
