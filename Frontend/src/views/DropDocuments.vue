<template>
  <div class="w-full h-screen" style="background-color: rgba(10,172,226,0.8)">
    <h1 class="text-3xl font-extrabold sm:text-5xl pt-20 w-full text-center text-blue-950">Drop Documents</h1>
    <div class="cursor-pointer justify-center">
      <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Drop your first document here</h3>
      <FilePond
          class="w-1/3 text-center mx-auto mt-2"
          name="filepond"
          label-idle="Drop files here or browse..."
          allow-multiple="true"
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          server="/api/upload"
      />
    </div>
    <div class="cursor-pointer justify-center">
      <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Drop your second document here</h3>
      <FilePond
          class="w-1/3 text-center mx-auto mt-2"
          name="filepond"
          label-idle="Drop files here or browse..."
          allow-multiple="true"
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          server="/api/upload"
      />
    </div>
    <div class="cursor-pointer justify-center">
      <h3 class="mt-16 text-xl font-extrabold  w-full text-center text-blue-950">Drop your third document here</h3>
      <FilePond
          class="w-1/3 text-center mx-auto mt-2"
          name="filepond"
          label-idle="Drop files here or browse..."
          allow-multiple="true"
          accepted-file-types="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          server="/api/upload"
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
        
    }
  },

  
  methods: {
        
 
    
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

