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
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Nome</label>
                        <input v-model='localMerchandise.name' type='text' class='form-control' name='name'>
                     </div>
                  </div>
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Número de Registro</label>
                        <input v-model='localMerchandise.registration_number' type='text' class='form-control'
                               name='registration_number'>
                     </div>
                  </div>
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Fabricante</label>
                        <input v-model='localMerchandise.manufacturer' type='text' class='form-control'
                               name='manufacturer'>
                     </div>
                  </div>
                  <div class='col-12 col-md-6 col-lg-6'>
                     <div class='mb-3'>
                        <label class='form-label'>Tipo</label>
                        <input v-model='localMerchandise.type' type='text' class='form-control' name='type'>
                     </div>
                  </div>
                  <div class='col-12'>
                     <div class='mb-3'>
                        <label class='form-label'>Descrição</label>
                        <textarea v-model='localMerchandise.description' class='form-control'
                                  name='description'></textarea>
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

export default {
   name: 'GoodsForm.vue',
   data () {
      return {
         localMerchandise: {
            name: '',
            registration_number: '',
            manufacturer: '',
            type: '',
            description: ''
         },
         errors: [],
         isEditing: false,
         loading: false
      }
   },
   async created () {
      this.setTitle({ title: 'Mercadorias' })
      if (this.$route.params.id) {
         this.localMerchandise = await GoodsService.get(this.$route.params.id)
         this.isEditing = true
      }
   },
   methods: {
      ...mapActions(['setTitle']),
      async submit () {
         this.loading = true
         this.resetErrors()

         let action = 'Cadastrado'
         if (this.localMerchandise.id) {
            action = 'Atualizado'
         }

         try {
            const response = await GoodsService.save(this.localMerchandise)
            const { data } = response

            if (!this.$route.params.id) {
               this.$router.push({
                  name: 'goodsEdit',
                  params: { id: data.id }
               })
               this.isEditing = true
            }

            this.$toast.success(`${action} com sucesso!`)
            console.log('OK...')
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
