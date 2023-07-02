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
    <div class="flex flex-col mx-40 mt-8">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h1 class="text-3xl bold px-8 mt-4 mb-8">Asked Loans :</h1>
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          
          <div class="overflow-hidden border border-gray-200  md:rounded-lg">
            
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50" v-if="loans">
                <tr>
                  <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                    <div class="flex items-center gap-x-3">
                      <button class="flex items-center gap-x-2">
                        <span>Date</span>             
                      </button>
                    </div>
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Purpose
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Status
                  </th>


                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Duration
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Broker
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Validation
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Action
                  </th>

                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 w-full">
                <h1 v-if="!loans" class="w-full py-4 px-4">0 loan loaded...</h1>
                <tr v-for="l in loans" v-bind:key="l">
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div class="inline-flex items-center gap-x-3">
                      <span>{{l.loanObject.askedDate}}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"><p class="w-28 overflow-hidden text-ellipsis">{{l.loanObject.purpose}}</p></td>
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <StatusComp :status="l.loanObject.status"></StatusComp>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{l.loanObject.duration}} months</td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{l.loanObject.broker}}</td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex justify-evenly mt-2 ">
                    <div class="border rounded-xl h-4 p-auto aspect-square	" :class="{'bg-green-500': l.loanObject.validation[0], 'bg-red-500': !l.loanObject.validation[0]}" ></div>
                    <div class="border rounded-xl bg-red-500 h-4 p-auto aspect-square	" :class="{'bg-green-500': l.loanObject.validation[1], 'bg-red-500': !l.loanObject.validation[1]}"></div>
                    <div class="border rounded-xl bg-red-500 h-4 p-auto aspect-square	" :class="{'bg-green-500': l.loanObject.validation[2], 'bg-red-500': !l.loanObject.validation[2]}"></div>
                  </td>
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" >
                    <svg v-on:click="this.$router.push(`/messages/${l.loanObject._id}`)" class="h-6 cursor-pointer" fill="#000000" width="64px" height="64px" viewBox="0 0 1920.00 1920.00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="19.2"></g><g id="SVGRepo_iconCarrier"> <path d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" fill-rule="evenodd"></path> </g></svg>                  </td>  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>


import axios from "axios";
import router from "@/router";
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import StatusComp from '../components/StatusComp.vue'


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
    StatusComp
  },
  props: {
  
  },

  data () {
    return {
      userinfo : null,
      token: '',
      loans: [],

    }
  },
  created(){
    this.userinfo = this.$parent.$parent.userinfo
    console.log(this.userinfo)
    this.token = localStorage.getItem("token")


    axios.get('http://localhost:3000/api/myloan', {headers: {Authorization: 'Bearer ' + this.token }})
      .then(response => {
        this.loans = response.data;
       })
        .catch(error => {
          console.log(error)
        })
    

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

