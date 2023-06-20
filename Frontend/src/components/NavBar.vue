<template>
  <header class="z-20 bg-white fixed w-full" v-if="!this.$parent.loading">
    <div
        class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4"
    >
      <router-link class="block text-teal-600" to="/">
        <span class="sr-only">Home</span>
        <img src="../assets/Logo.png" alt="" class="h-8">
      </router-link>

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <router-link class="text-gray-500 transition hover:text-gray-500/75" to="/">
                About
              </router-link>
            </li>

          </ul>
        </nav>

        <div  class="flex items-center gap-4">
          <div v-if="!user" class="sm:flex sm:gap-4">
            <router-link
                class="block rounded-md bg-myBlue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-myDarkBlue"
                to="/authentification/login"
            >
              Login
            </router-link>

            <router-link
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-myDarkBlue transition hover:text-myBlue sm:block"
                to="/authentification/register"
            >
              Register
            </router-link>
          </div>
          <div v-if="user"  class="sm:flex sm:gap-4">
            <div class="flex items-center mt-4 lg:mt-0">
                    <button class="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                        <div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                            <img src="">
                        </div>

                        <h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">NAME</h3>
                    </button>
                </div>
          </div>

          <button
              class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    user: String
  },
  created(){
    console.log(this.user)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
