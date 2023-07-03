<template>
  <div class="w-full h-screen" style="background-color: rgba(10,172,226,0.8)">
    <h1 class="text-3xl font-extrabold sm:text-5xl pt-20 w-full text-center text-blue-950">Drop Documents</h1>
    <div class="cursor-pointer justify-center">
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
    <div class="cursor-pointer justify-center">
      <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Relevé de compte (3 derniers mois)</h3>
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
    <div class="cursor-pointer justify-center">
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
  </div>
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
        loan: ''
    }
  },

 
  created() {
    axios.get('http://localhost:3000/api/loan/' + this.$route.params.id + '/', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token') }})
      .then(response => {
        this.loan = response.data;
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

