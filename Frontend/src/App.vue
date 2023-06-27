<template>
  <div v-if="!this.loading" class="body relative" style="height:100vh; overflow-y : scroll;" id="app">
    <NavBar :user="this.userinfo" :adm="adm"></NavBar>
    <router-view></router-view>

  </div>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
const axios = require('axios');
export default {
  name: 'App',
  components: {

    NavBar,

  },
  data () {
    return {
      loading: true,
      userinfo: '',
      adm: false
    }
  },

  beforeMount(){
    this.getUser()
    this.loading = false
  },

  methods: {
     async getUser(){
      const token = localStorage.getItem('token');

     axios.get('http://localhost:3000/api/user', {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        console.log(response.data)
        this.userinfo = response.data 
        axios.get('http://localhost:3000/api/user/isadmin', {headers: {Authorization: 'Bearer ' + token }})
        .then(response => {
          console.log("admin " + response.data)
          this.adm = response.data
        })
        .catch(error => {
          console.log(error)
        })
        this.loading = false
             
      })
      .catch(error => {
        console.log(error)
        this.loading = false
      })
    },

  
    }
    
  }


</script>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-user-select: none; /* pour les navigateurs basés sur WebKit */
  -moz-user-select: none; /* pour les navigateurs basés sur Gecko */
  -ms-user-select: none; /* pour les navigateurs basés sur Trident */
  user-select: none;
}

body{
  min-height : 100vh;
}


</style>
