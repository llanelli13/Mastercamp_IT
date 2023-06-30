<template>
    <div class="fixed rounded z-44 right-8 top-20 p-4"  style="max-width: 35vw; min-width: 20vw;"  v-if="titre && msg" :class="{ 'bg-green-300': status == 1, 'bg-red-300' : status == 2 }">
        <h1 v-on:click="this.$parent.createNotif('', '', null)" class="absolute right-4 top-2 cursor-pointer">X</h1>
        <div>
            <h1 class="mb-4" style="font-weight: 600;">{{ titre }}</h1>
            <h3>{{ msg }}</h3>
        </div>
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlertComp',
    props: {
        titre: String,
        msg: String,
        status: Number
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>