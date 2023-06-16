<template>
  <div class="body" style="height:100vh; overflow-y : scroll;" id="app">
    <NavBar></NavBar>
    <router-view></router-view>

  </div>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {

    NavBar,

  },
  data () {
    return {
     
    }
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
