<template>
  <div class="w-full  max-w-2xl px-8 py-4 mt-16 bg-white rounded-lg shadow-lg " :class = "{'place-self-end' : side, 'place-self-start ' : !side}">
    <div class="flex -mt-16 " :class = "{'justify-end' : side ,'justify-start' : !side}">
      <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80">
    </div>

    <p class="mt-2 text-sm text-gray-600 text-justify">Oui</p>
    <div class="flex mt-4" :class = "{'justify-start' : side, 'justify-end ' : !side}">
      <div  class="text-lg font-medium text-blue-600 " tabindex="0" role="link">John Doe</div>
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

    side : {
      type: Boolean,
      required: true
    }




  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
