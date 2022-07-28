<template>
   <div>
      <div class='card'>

         <div class='card-header'>
            <router-link
               :to="{ name: 'inputs_outputsCreate' }"
               class='btn btn-primary btn-sm'
            >
               Cadastrar Entrada/Saída
            </router-link>
         </div>

         <div class='card-body table-responsive'>
            <table class='table table-bordered' style='border-radius: 50px'>
               <thead>
               <tr>
                  <th style='width: 50px'>Cod.</th>
                  <th>Mercadoria</th>
                  <th>Quantidade</th>
                  <th>Tipo</th>
                  <th style='width: 120px'>Ações</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(inputOutput, index) in inputsOutputs" :key="index">
                  <td>{{ inputOutput.id }}</td>
                  <td>{{ inputOutput.merchandise }}</td>
                  <td>{{ inputOutput.qtd_goods }}</td>
                  <td>
                     <span :class="[{'badge rounded-pill bg-success' : inputOutput.type === 'input' },
                              {'badge rounded-pill bg-danger' : inputOutput.type === 'output' }]">
                        {{ inputOutput.type === 'input' ? 'Entrada' : 'Saída' }}
                     </span>
                  </td>
                  <td>
                     <router-link
                        :to="{ name: 'inputs_outputsEdit', params: { id: inputOutput.id, type: inputOutput.type } }"
                         class="btn btn-primary btn-sm mx-md-2">
                        <i class="bi bi-pencil"></i>
                     </router-link>
                  </td>
               </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputsOutputsService from '@/modules/dashboard/modules/inputs_outputs/services/inputs-outputs-service'

export default {
   name: 'InputOutputHome.vue',
   data () {
      return {
         inputsOutputs: []
      }
   },
   async created () {
      this.setTitle({ title: 'Entradas/Saídas' })
      const inputs = await InputsOutputsService.index('inputs')
      const outputs = await InputsOutputsService.index('outputs')
      this.inputsOutputs = Array.prototype.concat(inputs, outputs)
   },
   methods: {
      ...mapActions(['setTitle'])
   }
}
</script>
