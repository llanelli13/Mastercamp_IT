<template>

<div v-if="!connected" class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-40 bg-gray-100 rounded">
  <div class="mx-auto max-w-lg text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">Interface Banque</h1>

    <p class="mt-4 text-gray-500">
      Gestion des Courtiers
    </p>
  </div>

  <form action="" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
      <label for="id" class="sr-only">Id</label>

      <div class="relative">
        <input
          type="id"
          v-model="id"
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Identifiant"
        />

        
      </div>
    </div>

    <div>
      <label for="password" class="sr-only">Mot de passe</label>

      <div class="relative">
        <input
          type="password"
          v-model="pwd"
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Mot de passe"
        />

        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between">


      <button
        type="button"
        @click="this.connect()"
        class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
      >
        Se connecter
      </button>
    </div>
  </form>
</div>

<section v-else class="mt-40 container px-4 mx-auto">
    <h1 class="text-3xl mb-12">Gestion des courtiers</h1>
    <div class="flex justify-between">
        <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white"> Membres:</h2>

            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{{ this.connected.brokers.length }} Courtier</span>

        </div>
        <button @click="creation = true" class="border rounded px-4 py-2 bg-orange-300">Créer une Clé d'activation</button>
    </div>

    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div class="flex items-center gap-x-3">
                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700">
                                        <span>Name</span>
                                    </div>
                                </th>

                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-2">
                                        <span>Status</span>

                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-2">
                                        <span>Role</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </button>
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                                <th scope="col" class="relative py-3.5 px-4">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr v-for="b in connected.brokers" v-bind:key="b">
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700">

                                        <div class="flex items-center gap-x-2">
                                            <img class="object-cover w-10 h-10 rounded-full" :src="b.pp" alt="">
                                            <div>
                                                <h2 class="font-medium text-gray-800 dark:text-white ">{{ b.firstName }} {{ b.lastName }}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div v-if="!b.blocked" class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                        <h2 class="text-sm font-normal text-emerald-500">Actif</h2>
                                        
                                    </div>
                                    <div v-else class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                        <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>

                                        <h2 class="text-sm font-normal text-red-500">Bloqué</h2>
                                        
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Courtier</td>
                                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{{ b.email }}</td>  
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div class="flex items-center gap-x-6">
                                        <button @click="this.switch(b._id, !b.blocked)" class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                            <svg v-if="!b.blocked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            <svg class="w-5 h-5" v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" fill="#323232"></path> <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#323232" stroke-width="2"></path> <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                                        </button>

                                       
                                    </div>
                                </td>
                            </tr>

                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between mt-6">
        <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
                previous
            </span>
        </a>

   

        <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
                Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </a>
    </div>

    <div v-if="creation" class="fixed w-full h-full bg-gray-100 top-0 left-0 flex flex-col justify-center item-center">
      <div class="w-full flex justify-around">
        <div class="bg-white dark:bg-gray-900">
          <div class="max-w-3xl px-6 py-16 mx-auto text-center">
              <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Creation de Token</h1>
              <p v-if="!token" class="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">Mot de passe pour <strong>{{ connected.name }}</strong></p>
              <p v-else class="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">Clé d'activation pour <strong>{{ connected.name }}</strong></p>

              <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2" v-if="!token">
                  <input v-model="pwd2" id="pwd" type="password" class="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Mot de Passe">

                  <button @click="getToken()" class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      Obtenir une clé
                  </button>
              </div>
              <div v-else>
                <h2 class="align-center">{{this.token}}</h2>

                <button @click="token = ''; creation=false" class="mt-4 bg-red-400 rounded px-6 py-1">
                  Retour
                </button>
              </div>
          </div>
      </div>
      </div>
    </div>
</section>
  
  </template>
  <script>
  const axios = require('axios');


  
  export default {
    name: 'BrokerManagement',
    components: {
    
    },
    props: {
    
    },
  
    data () {
      return {
        creation: false,
        connected: '',
        token: '',
        id: '',
        pwd: ''
      }
    },

  
    methods: {
      
  
        connect(){
            
            axios.post(`http://localhost:3000/api/bank/connect`, {id: this.id, pwd: this.pwd})
                .then(response => {
                    
                    this.connected = response.data;

                })
                .catch(error => {
                    console.log(error);
                })
                  
        },

        getToken(){

          axios.post(`http://localhost:3000/api/token/generate`, {id: this.connected.name, pwd: this.pwd2})
                .then(response => {
                    this.token = response.data.token.tokenValue;
                    this.connect()
                })
                .catch(error => {
                    console.log(error);
                })
                  
        
        },

        switch(id, b){
            let block = !b
            console.log(block)
            axios.put(`http://localhost:3000/api/admin/block/` + id, {blocked: b})
                .then(() => {
                    this.connect()
                })
                .catch(error => {
                    console.log(error);
                })
                  
        
          
        }

        
  
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  * {
    -webkit-user-select:text; /* pour les navigateurs basés sur WebKit */
  -moz-user-select: text; /* pour les navigateurs basés sur Gecko */
  -ms-user-select: text; /* pour les navigateurs basés sur Trident */
  user-select: text;
  }

  </style>
  
  