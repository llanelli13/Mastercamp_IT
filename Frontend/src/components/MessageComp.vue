<template>
  <div class="w-full  max-w-2xl px-8 py-4 mt-16 bg-white rounded-lg shadow-lg " :class = "{'place-self-end' : side, 'place-self-start ' : !side}">
    <div class="flex -mt-16 " :class = "{'justify-end' : side ,'justify-start' : !side}">
      <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" :src="msg.senderId.pp">
    </div>

    <p class="mt-2 text-sm text-gray-600 text-justify">{{msg.content}}</p>
    <div class="flex mt-4" :class = "{'justify-start' : side, 'justify-end ' : !side}">
      <div  class="text-lg font-medium text-blue-600 " tabindex="0" role="link">{{msg.senderId.firstName}} {{msg.senderId.lastName}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MessageComp',
  props: {
    msg : {
      type: String,
      required: true
    },





  
  },

  data(){
    return{
      side: false
    }
  },

  created(){
    this.side = this.$parent.$parent.$parent.userinfo._id == this.msg.senderId._id
    console.log("side ", this.side)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
