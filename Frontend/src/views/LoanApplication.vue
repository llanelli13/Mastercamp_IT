<template>
  <div
      className="w-full h-full bg-gradient-to-r from-white to-gray-300 flex items-center justify-center"
  >
    <div
        className="w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow "
    >
      <h1
          className="text-xl font-extrabold sm:text-3xl pt-4 w-full text-center text-blue-950"
      >
        Loan Application
      </h1>
      <div className="sm:flex justify-center items-center mt-4">
        <div className="w-4/5 sm:w-2/5 mx-auto">
          <div className="mt-5">
            <label htmlFor="username" className="block text-sm text-black"
            >Total amount of your loan</label
            >
            <input
                type="number"
                placeholder="Ex : 20 000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-black"
            >Prefered monthly amount</label
            >
            <input
                type="number"
                placeholder="Ex : 500"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-black"
            >Prefered Duration
            </label>
            <input
                type="number"
                placeholder="Ex : 40"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="w-4/5 sm:w-2/5 mx-auto">
          <div className="mt-4">
            <label htmlFor="Description" className="block text-sm text-black"
            >Intended use of funds</label
            >
            <textarea
                placeholder="Ex : Pay for my studies ... "
                rows="5"
                className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="HeadlineAct" class Name="block text-sm text-black"
            >Type of loan</label
            >
            <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
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
      <div className="flex justify-center mt-10">
        <input
            style="width: 200px; height: 50px"
            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            type="submit"
            value="Submit"
        />
      </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios');

export default {

  name: 'LoanApplication',
  components: {},
  props: {},
  data() {
    return {
      brokers: []
    };
  },
  computed: {
      filteredBrokers() {
        return this.brokers.filter(b =>
          this.$parent.$parent.userinfo.bank == b.user.bank
        );
      }
    },

  created(){
    let token = localStorage.getItem("token")


    axios.get('http://localhost:3000/api/user/getAdmins', {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        this.brokers = response.data;
       })
        .catch(error => {
          console.log(error)
        })

  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
