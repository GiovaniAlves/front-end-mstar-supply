<template>
   <div>
      <div class='card'>

         <div class='card-header'>
            <router-link
               :to="{ name: 'goodsCreate' }"
               class='btn btn-primary btn-sm'
            >
               Cadastrar Mercadoria
            </router-link>
         </div>

         <div class='card-body table-responsive'>
            <table class='table table-bordered' style='border-radius: 50px'>
               <thead>
               <tr>
                  <th style='width: 50px'>Cod.</th>
                  <th>Nome</th>
                  <th>Número de Registro</th>
                  <th>Fabricante</th>
                  <th>Tipo</th>
                  <th style='width: 120px'>Ações</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="merchandise in goods" :key="merchandise.id">
                  <td>{{ merchandise.id }}</td>
                  <td>{{ merchandise.name }}</td>
                  <td>{{ merchandise.registration_number }}</td>
                  <td>{{ merchandise.manufacturer }}</td>
                  <td>{{ merchandise.type }}</td>
                  <td>
                     <router-link :to="{ name: 'goodsEdit', params: { id: merchandise.id } }" class="btn btn-primary btn-sm mx-md-2">
                        <i class="bi bi-pencil"></i>
                     </router-link>
                     <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
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
import GoodsService from '@/modules/dashboard/modules/goods/services/goods-service'

export default {
   name: 'GoodsHome.vue',
   data () {
      return {
         goods: []
      }
   },
   async created () {
      this.setTitle({ title: 'Mercadorias' })
      this.goods = await GoodsService.index()
   },
   methods: {
      ...mapActions(['setTitle'])
   }
}
</script>
