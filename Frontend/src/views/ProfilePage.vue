<template>
  <section class="bg-white ">
    <div class="max-w-6xl px-6 py-10 mx-auto">

      <main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
        <div class="absolute w-full bg-myBlue -z-10 md:h-96 rounded-2xl"></div>

        <div class="w-full p-6 bg-myBlue md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
          <img class="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="client photo" />

          <div class="mt-2 md:mx-6 flex items-center">
            <div class="h-2/5 mr-10 py-4">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
            </div>
            <div class="h-2/5 ml-10">
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
              </div>
              <div class="h-1/3 m-2">
                <label for="username" class="block text-xs sm:text-sm text-black">Total amount of your loan</label>
                <input type="text" placeholder="Amount" class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
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

export default {
  name: 'ProfilePage',
  components: {

  },
  props: {
  
  },

  data () {
    return {
        
    }
  },

  
  methods: {
    logout() {
      const token = localStorage.getItem('token');
      // Exemple avec Axios :
      axios.post('http://localhost:3000/api/user/logout',null , {headers: {Authorization: 'Bearer ' + token }})
          .then(response => {
            console.log(response.data)
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

