<template>
  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
    <div className="w-4/5 bg-myBlue h-4/5 rounded-xl drop-shadow-2xl">
      <h1 className="text-xl font-extrabold sm:text-3xl h-1/6 pt-4 w-full text-center text-blue-950">Loan
        Application</h1>
      <div className="sm:flex h-4/6 justify-center items-center">
        <div className="w-4/5 h-1/2 sm:w-2/5 sm:h-4/5 mx-auto">
          <div className="h-1/3">
            <label htmlFor="username" className="block text-sm text-black">Total amount of your loan</label>
            <input type="number" placeholder="Ex : 20 000"
                   className="block  w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"/>
          </div>
          <div className="h-1/3">
            <label htmlFor="username" className="block text-sm text-black">Prefered monthly amount</label>
            <input type="number" placeholder="Ex : 500"
                   className="block  w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"/>
          </div>
          <div className="h-1/3">
            <label htmlFor="username" className="block text-sm text-black">Prefered Duration </label>
            <input type="number" placeholder="Ex : 40"
                   className="block  w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"/>
          </div>
        </div>
        <div className="w-4/5 h-1/2 sm:w-2/5 sm:h-4/5 mx-auto">
          <div className="h-2/3">
            <label htmlFor="Description" className="block text-sm text-black">Intended use of funds</label>
            <textarea placeholder="Ex : Pay for my studies ... "
                      className="block w-full h-4/6 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
          </div>
          <div className="h-1/3">
            <label htmlFor="HeadlineAct" className="block text-sm text-black">Type of loan</label>
            <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="block w-full h-4/6 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              <option value="">Please select</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-1/6 mt-2 sm:mt-0">
        <input
            className="px-6 py-2 h-1/2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-myDarkBlue rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            type="submit"
            value="Submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanApplication',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
