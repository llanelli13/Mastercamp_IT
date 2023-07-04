<template>
  <section class="bg-gradient-to-r from-white to-gray-300 w-auto min-h-screen pt-24 ">
    <div
        class="container item-center justify-center px-4 sm:px-20 lg:px-60 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow ">
      <!--Header-->
      <h1 class="text-3xl font-extrabold sm:text-5xl pt-4 w-full text-center text-blue-950">Drop Documents</h1>
      <!-- Informations about the loan -->
      <div class="w-full text-center flex justify-evenly mt-4" >
        <p>But : {{this.loan.purpose}} </p>
        <p>Montant : {{this.loan.amount}} €</p>
        <p>Durée : {{this.loan.duration}} mois</p>
      </div>

      <!-- Drop documents 1-->
      <div v-if="this.loan.validation && this.loan.validation[0] === 0" class="cursor-pointer justify-center">
        <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Pièce d'identité</h3>
        <FilePond
            class="w-1/3 text-center mx-auto mt-2"
            name="identity"
            label-idle="Drop files here or browse..."
            :allow-multiple="false"
            accepted-file-types="application/pdf"
            :server="{
            url: `http://localhost:3000/api/upload/${this.$route.params.id}/id`,
            process: {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          }"
        />
      </div>

      <div v-else class=" w-full mt-16 h-1/6 flex flex-col justify-center items-center rounded-lg">
        <div class="relative w-2/3 sm:w-1/3 h-1/3 sm:flex text-center bg-gray-200 rounded-t-lg">
          <button class="absolute top-2 right-2 w-8 h-8  p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="w-2/5 text-center mx-auto flex justify-center items-center" :class="{'text-red-500' : this.loan.validation[0] === 0 ,'text-yellow-500' : this.loan.validation[0] === 1,'text-green-500' : this.loan.validation[0] === 2 }">
            <strong>Status: {{ this.loan.validation[0] === 0 ? 'Refusé' : (this.loan.validation[0] === 1 ? 'En cours ' : 'Validaté') }}</strong>
          </div>
          <div class="w-2/5 text-center mx-auto bg-gray-200 rounded-t-lg flex justify-center  items-center">
            Fichier : Identité
          </div>
          <div class=" w-1/5 text-center mx-auto bg-gray-200 rounded-t-lg">
          </div>

        </div>
        <div class="w-2/3 sm:w-1/3 bg-gray-200 px-1">
          Commentaire :
        </div>
        <div class="w-2/3 sm:w-1/3 h-2/3 bg-gray-200 rounded-b-lg shadow-lg text-sm px-1">
          Message de validation ou non
        </div>
      </div>

      <!-- Drop documents 2-->
      <div v-if="this.loan.validation && this.loan.validation[1] === 0" class="cursor-pointer justify-center">
        <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Relevé de compte</h3>
        <FilePond
            class="w-1/3 text-center mx-auto mt-2"
            name="compte"
            label-idle="Drop files here or browse..."
            :allow-multiple="false"
            accepted-file-types="application/pdf"
            :server="{
            url: `http://localhost:3000/api/upload/${this.$route.params.id}/compte`,
            process: {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          }"
        />
      </div>

      <div v-else class=" w-full mt-16 h-1/6 flex flex-col justify-center items-center rounded-lg">
        <div class="relative w-2/3 sm:w-1/3 h-1/3 sm:flex text-center bg-gray-200 rounded-t-lg">
          <button class="absolute top-2 right-2 w-8 h-8  p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="w-2/5 text-center mx-auto flex justify-center  items-center" :class="{'text-red-500' : this.loan.validation[1] === 0 ,'text-yellow-500' : this.loan.validation[1] === 1,'text-green-500' : this.loan.validation[1] === 2 }">
            <strong>Status: {{ this.loan.validation[1] === 0 ? 'Refusé' : (this.loan.validation[1] === 1 ? 'En cours' : 'Validaté') }}</strong>
          </div>
          <div class="w-2/5 text-center mx-auto bg-gray-200 rounded-t-lg flex justify-center  items-center">
            Fichier : Relevé de compte
          </div>
          <div class=" w-1/5 text-center mx-auto bg-gray-200 rounded-t-lg">
          </div>

        </div>
        <div class="w-2/3 sm:w-1/3 bg-gray-200 px-1">
          Commentaire :
        </div>
        <div class="w-2/3 sm:w-1/3 h-2/3 bg-gray-200 rounded-b-lg shadow-lg text-sm px-1">
          Message de validation ou non
        </div>
      </div>

      <!-- Drop documents 3-->
      <div v-if="this.loan.validation && this.loan.validation[2] === 0" class="cursor-pointer justify-center">
        <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Justificatif de revenus</h3>
        <FilePond
            class="w-1/3 text-center mx-auto mt-2"
            name="revenus"
            label-idle="Drop files here or browse..."
            :allow-multiple="false"
            accepted-file-types="application/pdf"
            :server="{
            url: `http://localhost:3000/api/upload/${this.$route.params.id}/revenus`,
            process: {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          }"
        />
      </div>

      <div v-else class=" w-full mt-16 h-1/6 flex flex-col justify-center items-center rounded-lg">
        <div class="relative w-2/3 sm:w-1/3 h-1/3 sm:flex text-center bg-gray-200 rounded-t-lg">
          <button class="absolute top-2 right-2 w-8 h-8  p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="w-2/5 text-center mx-auto flex justify-center  items-center" :class="{'text-red-500' : this.loan.validation[2] === 0 ,'text-yellow-500' : this.loan.validation[2] === 1,'text-green-500' : this.loan.validation[2] === 2 }">
            <strong>Status: {{ this.loan.validation[2] === 0 ? 'Refusé' : (this.loan.validation[2] === 1 ? 'En cours' : 'Validaté') }}</strong>
          </div>
          <div class="w-2/5 text-center mx-auto bg-gray-200 rounded-t-lg flex justify-center  items-center">
            Fichier : Justificatif de revenus
          </div>
          <div class=" w-1/5 text-center mx-auto bg-gray-200 rounded-t-lg">
          </div>

        </div>
        <div class="w-2/3 sm:w-1/3 bg-gray-200 px-1">
          Commentaire :
        </div>
        <div class="w-2/3 sm:w-1/3 h-2/3 bg-gray-200 rounded-b-lg shadow-lg text-sm px-1">
          Message de validation ou non
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';

// Create the FilePond component
const FilePond = vueFilePond();
const axios = require('axios')
export default {
  name: 'DropDocuments',
  components: {
      FilePond
  },
  props: {
  
  },

  data () {
    return {
        token: localStorage.getItem('token'),
        loan: {
          validation : []
        },
      document : [],

    }
  },

 
     created() {
     axios.get('http://localhost:3000/api/loan/' + this.$route.params.id + '/', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token') }})
      .then(response => {
        this.loan = response.data;
        console.log(this.loan)
       })
        .catch(error => {
          console.log(error)
        })



  },

  
  methods: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

