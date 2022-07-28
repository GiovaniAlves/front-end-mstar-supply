<template>
   <div>
      <div class='card'>

         <div v-if='Object.keys(errors).length'>
            <!-- O método Object.keys() retorna um array de propriedades enumeraveis de um determinado objeto -->
            <div v-for='(field, index) in Object.keys(errors)' :key='index' class='alert alert-danger' role='alert'>
               {{ field }}
               <div v-for='(error, indx) in errors[field]' :key='indx'>
                  {{ error }}
               </div>
            </div>
         </div>

         <div class='card-header'>
            <span v-if='!isEditing'>Cadastro</span>
            <span v-else>Edição</span>
         </div>

         <form @submit.prevent='submit'>
            <div class='card-body'>
               <div class='row'>
                  <div v-if='!isEditing' class='col-12 col-md-8 col-lg-8'>
                     <div class='mb-3'>
                        <label class='form-label'>Mercadoria</label>
                        <select v-model="localInputOutput.merchandise" class="form-select" name='merchandise'>
                           <option selected>Selecione a Mercadoria</option>
                           <option v-for="good in goods" :key="good.id" :value="good.id">{{ good.name }}</option>
                        </select>
                     </div>
                  </div>
                  <div v-if='!isEditing' class='col-12 col-md-4 col-lg-4'>
                     <div class='mb-3'>
                        <label class='form-label'>Tipo</label>
                        <select v-model="localInputOutput.type" class="form-select" name='merchandise'>
                           <option value="input" selected>Entrada</option>
                           <option value="output">Saída</option>
                        </select>
                     </div>
                  </div>
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Quantidade</label>
                        <input v-model="localInputOutput.qtd_goods" type='text' class='form-control' name='qtd_goods'>
                     </div>
                  </div>
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Local</label>
                        <input v-model="localInputOutput.local" type='text' class='form-control' name='local'>
                     </div>
                  </div>
               </div>
            </div>

            <div class='card-footer'>
               <div v-if='!isEditing'>
                  <button v-if='!loading' class='btn btn-primary btn-md' type='submit'>Cadastrar</button>
                  <button v-else disabled class='btn btn-primary btn-md' type='submit'>Cadastrando...</button>
               </div>
               <div v-else>
                  <button v-if='!loading' class='btn btn-primary btn-md' type='submit'>Editar</button>
                  <button v-else disabled class='btn btn-primary btn-md' type='submit'>Editando...</button>
               </div>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
import GoodsService from '@/modules/dashboard/modules/goods/services/goods-service'
import InputsOutputsService from '@/modules/dashboard/modules/inputs_outputs/services/inputs-outputs-service'

export default {
   name: 'InputOutputForm.vue',
   data () {
      return {
         localInputOutput: {
            qtd_goods: null,
            local: '',
            type: '',
            merchandise: null
         },
         goods: [],
         errors: [],
         isEditing: false,
         loading: false
      }
   },
   async created () {
      this.setTitle({ title: 'Entradas/Saídas' })
      this.goods = await GoodsService.index()
      if (this.$route.params.id) {
         this.localInputOutput = await InputsOutputsService.get(this.$route.params.id, this.$route.params.type)
         this.isEditing = true
      }
   },
   methods: {
      ...mapActions(['setTitle']),
      async submit () {
         this.loading = true
         this.resetErrors()

         let action = 'Cadastrado'
         if (this.localInputOutput.id) {
            action = 'Atualizado'
         }

         try {
            const response = await InputsOutputsService.save(this.localInputOutput, this.localInputOutput.type)
            const { data } = response

            if (!this.$route.params.id) {
               this.$router.push({
                  name: 'inputs_outputsEdit',
                  params: { id: data.id }
               })
               this.isEditing = true
            }

            this.$toast.success(`${action} com sucesso!`)
         } catch (error) {
            console.log(error)
            const { status } = error.response
            const errors = error.response.data

            if (status === 422) {
               this.errors = Object.assign(errors, this.errors)
               console.log('Error save merchandisesss', errors)
               setTimeout(() => this.resetErrors(), 7000)
               return
            }

            this.$toast.error('Falha')
            console.log('Error save merchandise', errors)
         } finally {
            this.loading = false
         }
      },
      resetErrors () {
         this.errors = []
      }
   }
}
</script>

<style scoped>

</style>
