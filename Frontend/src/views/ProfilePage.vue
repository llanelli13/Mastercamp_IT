<template>
  <section class="bg-gradient-to-r from-white to-gray-300" style="margin-top: -15px;">
    <div class="max-w-6xl px-6 py-10 mt-20 mx-auto">

      <main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
        <div
            class="absolute w-full bg-white  rounded-lg shadow  -z-10 md:h-96 rounded-2xl shadow-xl"></div>


        <div
            class="w-full p-6 md:flex md:items-center bg-white  rounded-lg   md:p-0 lg:px-12 md:justify-evenly">
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
          <div class="relative aspect-ratio-1/1 w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80" @mouseenter="hover = true"
               v-else>

            <img class="w-full h-full object-cover transition-all duration-500 ease-in-out rounded-full "
                 :class="{'blur':hover}" :src="this.$parent.$parent.userinfo.pp"/>

            <div
                v-if="hover"
                class="absolute inset-0 flex items-center justify-center cursor-pointer rounded-full transition-all bg-black bg-opacity-50 duration-500 ease-in-out"
                @mouseleave="hover = false"
                @click="this.$parent.$parent.userinfo.pp = null">
              <p class="text-white text-lg">Modifier l'image</p>
            </div>
          </div>


          <div class="mt-2 md:mx-6 flex items-center">
            <div class="h-2/5 mr-10 py-4">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs  sm:text-sm text-black">Nom</label>
                <input type="text"
                       :value="this.$parent.$parent.userinfo.lastName"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Prénom</label>
                <input type="text"
                       :value="this.$parent.$parent.userinfo.firstName"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Numéro de téléphone</label>
                <input type="text"
                       :value="this.$parent.$parent.userinfo.phoneNumber"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              </div>
            </div>
            <div class="h-2/5 ml-10">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Email</label>
                <input type="text"
                       :value="this.$parent.$parent.userinfo.email"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Date de naissance</label>
                <input type="text" :value="this.$parent.$parent.userinfo.birthday"
                       class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"/>
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Genre</label>
                <input type="text"
                       :value="this.$parent.$parent.userinfo.gender"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              </div>

            </div>


          </div>
          <div class="flex justify-evenly sm:flex-col">
            <input
                class="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                type="submit"
                value="Modifier"
            />
            <input
                class="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                type="submit"
                value="Déconnexion"
                @click="logout"

            />

          </div>

        </div>

      </main>

    </div>
    <div class="flex flex-col w-full mx-auto mx-10 mt-8">
      <div class="w-full -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h1 class="text-3xl bold px-8 mt-4 mb-8">Demande de prêts :</h1>
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
                  But
                </th>

                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                  État
                </th>


                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                  Durée
                </th>
                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                  Courtier
                </th>
                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                  Validation des documents
                </th>
                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                  Actions
                </th>

                <th scope="col" class="relative py-3.5 px-4">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>

              </thead>

              <tbody v-if="!loading" class="bg-white divide-y divide-gray-200 w-full">
              <h1 v-if="!loans" class="w-full py-4 px-4">Aucun prêt chargé ...</h1>
              <tr v-for="l in loans" v-bind:key="l">
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div class="inline-flex items-center gap-x-3">
                    <span>{{ l.askedDate }}</span>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"><p
                    class="w-28 overflow-hidden text-ellipsis">{{ l.purpose }}</p></td>
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <StatusComp :status="l.status"></StatusComp>
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ l.duration }} months</td>
                <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ l.broker }}</td>
                <td class="pr-6 py-4 text-sm text-gray-500 whitespace-nowrap flex justify-evenly mt-2 ">
                  <div class="border rounded-xl h-4 p-auto aspect-square	"
                       :class="{'bg-green-500': l.validation[0] == 2, 'bg-yellow-500': l.validation[0] == 1, 'bg-red-500': l.validation[0] == 0}"></div>
                  <div class="border rounded-xl h-4 p-auto aspect-square	"
                       :class="{'bg-green-500': l.validation[1] == 2, 'bg-yellow-500': l.validation[1] == 1, 'bg-red-500': l.validation[1] == 0}"></div>
                  <div class="border rounded-xl h-4 p-auto aspect-square	"
                       :class="{'bg-green-500': l.validation[2] == 2, 'bg-yellow-500': l.validation[2] == 1, 'bg-red-500': l.validation[2] == 0}"></div>
                </td>
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div class="flex">
                    <svg v-on:click="this.$router.push(`/messages/${l._id}`)" class="mx-2 h-6 cursor-pointer"
                         fill="#000000" viewBox="0 0 1920.00 1920.00" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                         stroke-width="19.2"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                            d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"
                            fill-rule="evenodd"></path>
                      </g>
                    </svg>
                    <svg @click="this.$router.push(`/dropDocuments/${l._id}`)" class=" mx-2 h-6 cursor-pointer"
                         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                            d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM12.2914 5.46127C12.5461 5.13467 12.4879 4.66338 12.1613 4.40862C11.8347 4.15387 11.3634 4.21212 11.1086 4.53873L12.2914 5.46127ZM7.20862 9.53873C6.95387 9.86533 7.01212 10.3366 7.33873 10.5914C7.66533 10.8461 8.13662 10.7879 8.39138 10.4613L7.20862 9.53873ZM12.2914 4.53873C12.0366 4.21212 11.5653 4.15387 11.2387 4.40862C10.9121 4.66338 10.8539 5.13467 11.1086 5.46127L12.2914 4.53873ZM15.0086 10.4613C15.2634 10.7879 15.7347 10.8461 16.0613 10.5914C16.3879 10.3366 16.4461 9.86533 16.1914 9.53873L15.0086 10.4613ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM11.1086 4.53873L7.20862 9.53873L8.39138 10.4613L12.2914 5.46127L11.1086 4.53873ZM11.1086 5.46127L15.0086 10.4613L16.1914 9.53873L12.2914 4.53873L11.1086 5.46127ZM10.95 5V16H12.45V5H10.95Z"
                            fill="#000000"></path>
                      </g>
                    </svg>
                  </div>

                </td>
              </tr>
              </tbody>
            </table>
            <div v-if="loading" class="w-full flex justify-center">
              <div class="mt-4 mb-4 h-12 w-12 lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

            </div>
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
      hover : false,
      loading: true

    }
  },
  created(){
    this.userinfo = this.$parent.$parent.userinfo
    console.log(this.userinfo)
    this.token = localStorage.getItem("token")


    axios.get('http://localhost:3000/api/myloan', {headers: {Authorization: 'Bearer ' + this.token }})
      .then(response => {
        this.loans = response.data;
        this.loading = false
       })
        .catch(error => {
          this.loading = false

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

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #0d68b4;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #0d68b4 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

