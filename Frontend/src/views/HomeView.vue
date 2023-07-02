<template>
  <section class="bg-gray-50 h-full">
    <div
        class="mx-auto max-w-screen-xl  px-20 lg:px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Find a Loan
          <strong class="font-extrabold text-myBlue text-lg sm:text-3xl block">
            Connect to a broker
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
          tenetur fuga ducimus numquam ea!
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
              class="block w-full rounded bg-myBlue px-12 py-3 text-sm font-medium text-white shadow hover:bg-myDarkBlue focus:outline-none focus:ring active:bg-myBlue sm:w-auto"
              to="/get-started"
          >
            Ask for a loan
          </router-link>
        </div>
      </div>
    </div>
  </section>

</template>
<script>



export default {
  name: 'HomeView',
  components: {


  },
  props: {
  
  },

  data () {
    return {
        
    }
  },

  
  methods: {
        
 
    
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

