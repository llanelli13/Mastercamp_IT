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
      adm: false,


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

    async getDocuments(id) {
      await this.waitingForUser();
      const token = localStorage.getItem('token');

      const pdfSource = {
        'id': '',
        'compte': '',
        'revenus': '',
      };

      const requests = [
        axios.get(`http://localhost:3000/api/file/${id}/id`, {headers: {Authorization: 'Bearer ' + token }})
            .then(response => {
              pdfSource.id = response.data;
            })
            .catch(error => {
              console.log('TKT ' + error);
              pdfSource.id = 'none';
            }),

        axios.get(`http://localhost:3000/api/file/${id}/compte`, {headers: {Authorization: 'Bearer ' + token }})
            .then(response => {
              pdfSource.compte = response.data;
            })
            .catch(error => {
              console.log('TKT ' + error);
              pdfSource.compte = 'none';
            }),

        axios.get(`http://localhost:3000/api/file/${id}/revenus`, {headers: {Authorization: 'Bearer ' + token }})
            .then(response => {
              pdfSource.revenus = response.data;
            })
            .catch(error => {
              console.log('TKT ' + error);
              pdfSource.revenus = 'none';
            })
      ];

      await Promise.all(requests);


      return pdfSource;

  },


    waitingForUser(){
      return new Promise((resolve) => {

        const interval = setInterval(() => {
          console.log("waiting ..");
          if (this.userinfo !== null) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    },
  },}
  

    





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
