<template>
  <div v-if="!this.loading" class="body relative" style="height:100vh; overflow-y : scroll;" id="app">
    <AlertComp :titre="notifTitre" :msg="notifMsg" :status='notifType'></AlertComp>
    <NavBar :user="this.userinfo" :adm="adm"></NavBar>
    <router-view></router-view>

  </div>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AlertComp from "@/components/AlertComp.vue";

const axios = require('axios');
export default {
  name: 'App',
  components: {
    AlertComp,
    NavBar,

  },
  data () {
    return {
      loading: true,
      userinfo: '',
      adm: false,

      notifTitre: '',
      notifMsg: '',
      notifType: 0

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
              console.log(error);
              pdfSource.id = 'none';
            }),

        axios.get(`http://localhost:3000/api/file/${id}/compte`, {headers: {Authorization: 'Bearer ' + token }})
            .then(response => {
              pdfSource.compte = response.data;
            })
            .catch(error => {
              console.log(error);
              pdfSource.compte = 'none';
            }),

        axios.get(`http://localhost:3000/api/file/${id}/revenus`, {headers: {Authorization: 'Bearer ' + token }})
            .then(response => {
              pdfSource.revenus = response.data;
            })
            .catch(error => {
              console.log(error);
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


    createNotif(titre, msg, type){
      this.notifTitre = titre;
      this.notifMsg = msg;
      this.notifType = type;

      setTimeout(() => {
        this.notifTitre = "";
        this.notifMsg = "";
        this.notifType = "";
      }, 5000); // 3000 milliseconds = 3 seconds
    }


  },


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

/* This will hide the scrollbar for Chrome, Safari and Opera */
.your-div-class::-webkit-scrollbar {
    display: none;
}

/* This will hide the scrollbar for IE and Edge */
.your-div-class {
    -ms-overflow-style: none;
}

/* This will hide the scrollbar for Firefox */
.your-div-class {
    scrollbar-width: none;
}


</style>
