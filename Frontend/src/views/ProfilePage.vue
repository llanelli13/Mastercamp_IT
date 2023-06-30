<template>
  <section class="bg-white ">
    <div class="max-w-6xl px-6 py-10 mt-20 mx-auto">

      <main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
        <div class="absolute w-full bg-myBlue -z-10 md:h-96 rounded-2xl"></div>


        <div class="w-full p-6 bg-myBlue md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
          <FilePond
              v-if="!this.$parent.$parent.userinfo.pp"
              class="aspect-ratio-1/1 w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"
              name="filepond"
              label-idle="Drag & Drop your picture or <span class='filepond--label-action'>Browse</span>"
              image-preview-height="170"
              image-crop-aspect-ratio="1:1"
              image-resize-target-width="200"
              image-resize-target-height="200"
              style-panel-layout="compact circle"
              style-load-indicator-position="center bottom"
              style-button-remove-item-position="center bottom"
              accepted-file-types="image/png, image/jpeg, image/gif"
              :server="{
                url: `http://localhost:3000/api/ppupload/${this.$parent.$parent.userinfo._id}`,
                process: {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              }"
          />
          <img class="aspect-ratio-1/1 w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 " style="border-radius: 100%;" v-else :src="this.$parent.$parent.userinfo.pp" alt="">

          <div class="mt-2 md:mx-6 flex items-center">
            <div class="h-2/5 mr-10 py-4">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs  sm:text-sm text-black">Last Name</label>
                <input type="text" :value="this.$parent.$parent.userinfo.lastName" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">First Name</label>
                <input type="text" :value="this.$parent.$parent.userinfo.firstName" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Phone Number</label>
                <input type="text" :value="this.$parent.$parent.userinfo.phoneNumber" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
            </div>
            <div class="h-2/5 ml-10">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Email</label>
                <input type="text" :value="this.$parent.$parent.userinfo.email" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Birthdate</label>
                <input type="text" :value="this.$parent.$parent.userinfo.birthday" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Gender</label>
                <input type="text" :value="this.$parent.$parent.userinfo.gender" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              
            </div>
            




          </div>
          <div class="flex justify-evenly sm:flex-col">
            <input
                className="px-6 w-2/5 sm:w-auto sm:mb-4 py-2 h-1/2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                type="submit"
                value="Save"
            />
            <input
                className="px-6 w-2/5 sm:w-auto py-2 h-1/2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                type="submit"
                value="Logout"
                @click="logout"

            />

          </div>
          
        </div>
        
      </main>
      
    </div>
  </section>

</template>
<script>


import axios from "axios";
import router from "@/router";
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import FilePond plugins
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// Create the FilePond component
const FilePond = vueFilePond(FilePondPluginFileEncode, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform);



export default {
  name: 'ProfilePage',
  components: {
    FilePond,
  },
  props: {
  
  },

  data () {
    return {
      userinfo : null,
      token: ''

    }
  },
  created(){
    this.userinfo = this.$parent.$parent.userinfo
    console.log(this.userinfo)
    this.token = localStorage.getItem("token")

  }
  ,


  methods: {
    logout() {
      const token = localStorage.getItem('token');
      // Exemple avec Axios :
      axios.post('http://localhost:3000/api/user/logout',null , {headers: {Authorization: 'Bearer ' + token }})
          .then(response => {
            console.log(response.data)
            this.$parent.$parent.userinfo = ''

            router.push({ name: 'Home' })

          })
          .catch(error => {
            console.log(error)

          })
    },




    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

