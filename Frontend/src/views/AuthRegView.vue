<template>
  <section class="bg-gray-100 w-auto min-h-screen py-24 ">
    <!-- Logo -->
    <div class=" flex justify-center mx-auto">
      <img class="w-auto h-7 sm:h-8" src="../assets/Logo.png" alt="">
    </div>
    <div class="container items-center justify-center my-12 px-4 sm:px-20 lg:px-60 mx-auto">
      <!-- Buttons SignIn/SignUp -->

      <div class=" w-full flex items-center justify-center mt-6">
        <div v-on:click="loginParam = 'login'" class="cursor-pointer w-1/2 pb-4 font-medium text-center text-gray-500 capitalize border-b " :class="{'border-b-2 border-blue-500 text-black' : loginParam == 'login'}">
          sign in
        </div>

        <div v-on:click="loginParam = 'register';" class="cursor-pointer w-1/2 pb-4 font-medium text-center text-gray-500 capitalize border-b " :class="{'border-b-2 border-blue-500 text-black' : loginParam == 'register'}">
          sign up
        </div>
      </div>

      <div class="w-full flex flex-column justify-center py-3">
        <form  v-if="loginParam == 'register'" class="w-full  sm:grid sm:grid-cols-2 gap-4">
          <!-- Existing Inputs -->
          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
          </span>
            <input v-model="firstName" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="First name">
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
          </span>
            <input v-model="lastName" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Last name">
          </div>


          <div class="relative flex items-center py-1">
            <!-- New Input 1 -->
            <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-3 text-gray-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path>
            </svg>
          </span>
            <input  v-model="phoneNumber" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Phone number">
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
          </span>
            <input v-model="email" type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Email address">
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar text-gray-500 w-6 h-6 mx-3" viewBox="0 0 16 16" >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
          </span>
            <input v-model="birthDate" type="date" class="block  w-full placeholder-gray-400/70  rounded-lg border border-gray-200 bg-white pl-12  pr-4 py-3 text-black focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " />
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
          </span>
            <input v-model="gender" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Gender">
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
          </span>
            <input v-model="pwd" type="password" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Password">
          </div>

          <div class="relative flex items-center py-1">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
          </span>
            <input type="password" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Confirm Password">
          </div>



          <div  class="relative flex items-center py-1">
          <span class="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bank h-6 w-6 text-gray-500 mx-3" viewBox="0 0 16 16">
                <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z"/>
              </svg>
          </span>
            <select
                v-model="bank"
                name="HeadlineAct"
                id="HeadlineAct"
                class="block w-full rounded-lg py-3 px-10 border border-gray-300"
            >
              <option value="">Select Bank</option>
              <option v-for="b in bankValue " v-bind:key="b" :value="b">{{ b.name }}</option>

            </select>
          </div>

          <div class="col-span-2 mt-6">
            <input type="button" value="Register" v-on:click="register()" class="w-full cursor-pointer px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400" > 
          </div>
        </form>
        <form v-if="loginParam == 'login'" class="w-full">

          <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

            <input v-model="loginMail" type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address">
          </div>

          <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

            <input v-model="loginPwd" type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password">
          </div>



          <div class="mt-6">
            <input value="login" v-on:click="loginUser(loginMail, loginPwd)" type="button" class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              


          </div>
        </form>
      </div>
    </div>
  </section>
</template>




<script>
import router from '@/router';

const axios = require('axios');
export default {
  name: 'AuthRegView',
  components: {},
  mounted() {
    this.loginParam = this.$route.params.type;
    this.$route.params.type = ""
  },
  props: {},
  data () {
    return {
      bankValue : '',
      bank : '',
      firstName : '',
      lastName : '',
      email : '',
      pwd : '',
      gender :'',
      phoneNumber : '',
      birthDate : '',
      loginMail: '',
      loginPwd: '',
      loginParam: ''

    }
  },


  methods: {
    async register() {
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        birthday: this.birthDate,
        gender: this.gender,
        password: this.pwd,
        bank: this.bank.name,
      };

      console.log(user);

  
      axios.post('http://localhost:3001/api/user/register', user)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      
    },

    async loginUser(email, password) {
      try {
        const response = await fetch('http://localhost:3001/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // Do something with data
        console.log(data);
        
        // Saving auth token to localStorage or other state management.
        localStorage.setItem("token", data.authToken);

      } catch (error) {
        console.error(error);
      }
    }


  },
  beforeCreate() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3001/api/user', {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        console.log(response)
        router.push('/')
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('http://localhost:3001/api/banks')
      .then(response => {
        this.bankValue = response.data
      })
      .catch(error => {
        console.log(error)
      })


  }
}
</script>

<style scoped>
</style>
