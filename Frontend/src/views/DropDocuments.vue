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
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          :server="{
            url: 'http://localhost:3000/api/upload/id',
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
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          :server="{
            url: 'http://localhost:3000/api/upload/compte',
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
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          :server="{
            url: 'http://localhost:3000/api/upload/revenus',
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
export default {
  name: 'DropDocuments',
  components: {
      FilePond
  },
  props: {
  
  },

  data () {
    return {
        token: ''
    }
  },

  mounted(){
    this.token = localStorage.getItem('token');
  },

  
  methods: {
        
 
    
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

