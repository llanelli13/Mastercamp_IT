<template>
  <header class="z-40 bg-white fixed w-full drop-shadow-md" v-if="!this.$parent.loading">
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4">
      <router-link class="block text-teal-600" to="/">
        <span class="sr-only">Home</span>
        <img src="../assets/Logo.png" alt="" class="h-8">
      </router-link>

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <router-link class="text-gray-500 transition hover:text-blue-700" to="/">
                About
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="relative flex items-center gap-4">
          <div v-if="!user" class="sm:flex sm:gap-4">
            <router-link
                class="hidden sm:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                to="/authentification/login"
            >
              Login
            </router-link>
            <router-link
                class="hidden sm:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                to="/authentification/register"
            >
              Register
            </router-link>
          </div>

          <div v-if="user" class="sm:flex sm:gap-4">
            <router-link
                class="hidden sm:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                to="/loanApplication"
            >
              Ask for a loan
            </router-link>

            <router-link
                class="hidden sm:block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                to="/profile"


            >
              Profile
            </router-link>
            <router-link
                v-if="this.adm == true"
                class="hidden sm:block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                to="/loansDashboard"


            >
              Administration
            </router-link>
          </div>

          <button
              class="sm:hidden sm:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="showMenu = !showMenu"
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

          <div
              class="absolute top-2 right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-md md:hidden"
              v-show="showMenu"
          >
            <router-link
                class="block px-4 py-2 text-myDarkBlue hover:bg-gray-100"
                :to="user ? '/loanApplication' : '/authentification/login'"
                @click="showMenu = !showMenu"

            >
              {{ user ? 'Ask for a loan' : 'Login' }}
            </router-link>
            <router-link
                class="block px-4 py-2 text-myDarkBlue hover:bg-gray-100"
                :to="user ? '/profile' : '/authentification/register'"
                @click="showMenu = !showMenu"
            >
              {{ user ? 'Profile' : 'Register' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    user: String,
    adm: Boolean
  },
  data() {
    return {
      showMenu: false
    };
  },
  created() {
    console.log(this.user);
  },
  methods: {

  }

};
</script>

<style scoped>
</style>
