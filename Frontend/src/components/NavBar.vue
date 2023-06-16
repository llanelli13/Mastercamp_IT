<template>
  <header class="bg-white fixed w-full">
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

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <router-link
                class="block rounded-md bg-myBlue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-myDarkBlue"
                to="/"
            >
              Login
            </router-link>

            <router-link
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-myDarkBlue transition hover:text-myBlue sm:block"
                to="/authentification"
            >
              Register
            </router-link>
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
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
