<template>
  <div v-if="showModal" class="absolute w-screen h-screen bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 flex items-center justify-center">
    <div class="relative w-full sm:w-2/5 mx-auto h-4/5 aspect-auto overflow-auto border z-60 bg-white">
      <vue-pdf-embed :source="this.documentToShow" />
      <button @click="showModal = false" class="fixed top-2 right-2 w-12 h-12 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>


  <div class="mt-20 w-2/3 mx-auto h-5/6">
    <div>
      <ol class="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm  sm:grid-cols-3">
        <li v-if="this.pdfSource.id === 'none'"  class="flex items-center justify-center cursor-not-allowed bg-gray-300 gap-2 p-4"  >
        <span
            class="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block">
        </span>

          <span
              class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block">
        </span>

          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> First Document </strong>
            <small class="mt-1"> First document is missing ... </small>
          </p>
        </li>
        <li v-else @click="this.selected = 1" class="flex items-center justify-center gap-2 p-4" :class="{'relative bg-myBlue text-white' : selected == 1 , 'relative bg-myDarkBlue text-gray-400' :selected != 1}">
          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> First Document </strong>
            <small class="mt-1"> Description of the document </small>
          </p>
        </li>

        <li v-if="this.pdfSource.compte === 'none'"  class="flex items-center justify-center cursor-not-allowed bg-gray-300 gap-2 p-4"  >
        <span
            class="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block">
        </span>

          <span
              class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block">
        </span>

          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> Second Document </strong>
            <small class="mt-1"> Second document is missing ... </small>
          </p>
        </li>
        <li v-else @click="this.selected = 2" class="flex items-center justify-center gap-2  p-4" :class="{'relative bg-myBlue text-white' : selected == 2 , 'relative bg-myDarkBlue text-gray-400' :selected != 2}">
        <span
            class="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block">
        </span>

          <span
              class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block">
        </span>

          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> Second Document </strong>
            <small class="mt-1"> Description of the document</small>
          </p>
        </li>


        <li v-if="this.pdfSource.revenus === 'none'"  class="flex items-center justify-center cursor-not-allowed bg-gray-300 gap-2 p-4"  >
        <span
            class="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block">
        </span>

          <span
              class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block">
        </span>

          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> Third Document </strong>
            <small class="mt-1"> Third document is missing ... </small>
          </p>
        </li>
        <li v-else @click="this.selected = 3" class="flex items-center justify-center  gap-2 p-4" :class="{'relative bg-myBlue text-white' : selected == 3 , 'relative bg-myDarkBlue text-gray-400' :selected != 3}">
          <svg
              class="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>

          <p class="leading-none">
            <strong class="block font-medium"> Third Document </strong>
            <small class="mt-1"> Description of the document </small>
          </p>
        </li>
      </ol>
    </div>
    <div class="h-5/6 mt-10 sm:flex relative ">
      <div @click="showModal = true" class="w-full mb-2 sm:w-2/5 mx-auto  h-full aspect-auto overflow-auto border cursor-pointer ">
          <vue-pdf-embed  v-if="this.documentToShow" class="cursor-pointer" :source="this.documentToShow" />
      </div>
      <div class="w-4/5 h-1/2 sm:w-2/5 sm:h-4/5 mx-auto">
        <div v-if="!isSmallScreen || opened" class="h-2/3">
          <label for="Description" class="block text-sm text-black mb-2">Information about the document to communicate</label>
          <textarea placeholder="Ex: Pay for my studies..."
                    class="block w-full h-4/6 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
          </textarea>
        </div>
        <div v-else @click="opened = true" class="h-1/3 flex items-center justify-center text-gray-500">
          Open description
        </div>
        <div class="h-1/3">

          <div class="flex flex-col w-full">
            <input
                className="px-6 w-auto sm:w-auto mb-4 py-2 h-1/2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                type="submit"
                value="Validate file"
            />
            <input
                className="px-6 w-auto sm:w-auto  mb-4 py-2 h-1/2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                type="submit"
                value="Refuse file"


            />

          </div>
        </div>
        </div>


    </div>


  </div>

</template>
<script>
import VuePdfEmbed from 'vue-pdf-embed'
export default {
  name: 'DocumentValidation',
  components: {
    VuePdfEmbed,
  },
  props: {},
  data() {
    return {
      selected: '1',
      opened: false,
      pdfSource : [],
      showModal: false,
      documentToShow: null,
    };
  },
  methods: {},
  async created() {
    const response = await this.$parent.$parent.getDocuments();
    this.pdfSource = response;
    this.documentToShow = this.pdfSource.id;

  },
  watch: {
    selected: function (newSelectedValue) {
      if (newSelectedValue === 1) {
        this.documentToShow = this.pdfSource.id;
      } else if (newSelectedValue === 2) {
        this.documentToShow = this.pdfSource.compte;
      } else if (newSelectedValue === 3) {
        this.documentToShow = this.pdfSource.revenus;
      }
    },
  },
  computed: {
    isSmallScreen() {
      return window.innerWidth < 640; // Adjust the threshold as per your requirements
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    
</style>

