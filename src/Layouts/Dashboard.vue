<template>
   <div>
      <div class='d-flex' id='wrapper'>
         <!-- SIDEBAR START -->
         <Sidebar />
         <!-- SIDEBAR END -->

         <!-- PAGE CONTENT START -->
         <div id='page-wrapper'>
            <nav class='navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4'>
               <div class='d-flex align-items-center'>
                  <i
                     @click='toggleSideBar'
                     class='bi bi-justify-left fs-2 me-3'
                     id='menu-toggle'
                  ></i>
                  <h2 class='fs-2 m-0'> {{ title || 'Painel' }} </h2>
               </div>

               <button class='navbar-toggler' type='button' data-bs-toggle='collapse'
                       data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
                       aria-expanded='false' aria-label='Toggle navigation'>
                  <span class='navbar-toggler-icon'></span>
               </button>

               <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                  <ul class='navbar-nav ms-auto mb-2 mx-5 mb-lg-0'>
                     <li class='nav-item dropdown'>
                        <a class='nav-link dropdown-toggle second-text fw-bold' href='#' id='navbarDropdown'
                           role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                           <i class='fas fa-user me-2'></i>Giovani
                        </a>
                        <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>
                           <li>
                              <a class='dropdown-item' href='#'>Notificações <span
                                 class='badge bg-primary'>100</span></a>
                           </li>
                           <li>
                              <span class='dropdown-item cursor-pointer'>Sair</span>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </nav>

            <div class='container-fluid'>
               <router-view />
            </div>

         </div>
         <!-- PAGE CONTENT END -->
      </div>

      <Footer />
   </div>
</template>

<script>
import Sidebar from '@/Layouts/Components/Sidebar'
import Footer from '@/Layouts/Components/Footer'
import { mapState } from 'vuex'

export default {
   name: 'Dashboard',
   components: {
      Footer,
      Sidebar
   },
   computed: {
      ...mapState({
         title: state => state.title
      })
   },
   methods: {
      toggleSideBar () {
         // eslint-disable-next-line no-undef
         $('#wrapper').toggleClass('toggled')
      }
   }
}
</script>

<style scoped>
@import url('./../assets/css/dashboardStyle.css');

.cursor-pointer {
   cursor: pointer;
}
</style>
