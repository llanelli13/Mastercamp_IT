<template>
  <section class="bg-gradient-to-r from-white to-gray-300 h-full">
    <div
        class="mx-auto max-w-screen-xl  px-20 lg:px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Trouvez un prêt
          <strong class="font-extrabold text-blue-700 text-lg sm:text-3xl block">
            Contactez un courtier
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          La clé de votre projet immobilier : notre réseau, votre réussite !
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <div
              to="/loanApplication"
              style="width: 200px; height: 50px;"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Simuler un prêt
          </div>
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

