<template>
  <p></p>
  <div v-if="con"
      className="w-full h-full bg-gradient-to-r from-white to-gray-300 flex items-center justify-center"
  >
    <div
        className="w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow "
    >
      <h1
          className="text-xl font-extrabold sm:text-3xl pt-4 w-full text-center text-blue-950"
      >
        Demande de prêt
      </h1>
      <div className="sm:flex justify-center items-center mt-4">
        <div className="w-4/5 sm:w-2/5 mx-auto">
          <div className="mt-5">
            <label htmlFor="username" className="block text-sm text-black"
            >Montant total du prêt</label
            >
            <input
                v-model="amount"
                type="number"
                placeholder="Ex : 20 000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-black"
            >Durée envisagée
            </label>
            <input
                v-model="time"
                type="number"
                placeholder="Ex : 40"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-black"
            >Montant mensuel</label
            >
            <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
              {{ this.average }} €/mois
              </span>
          </div>
          
        </div>
        <div className="w-4/5 sm:w-2/5 mx-auto">
          <div className="mt-4">
            <label htmlFor="Description" className="block text-sm text-black"
            >Intention d'utilisation des fonds</label
            >
            <textarea
                v-model="purpose"
                placeholder="Ex : Acheter un bien immobilier à Paris ..."
                rows="5"
                className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="HeadlineAct" class Name="block text-sm text-black"
            >Courtier</label
            >
            <select
              name="HeadlineAct"
              id="HeadlineAct"
              v-model="broker"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option v-for="b in this.filteredBrokers" :key="b" :value="b.user._id">{{ b.user.firstName }} {{ b.user.lastName }}</option>
          </select>

          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <input
            style="width: 200px; height: 50px"
            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            type="button"
            value="Soumettre"
            @click="createLoan()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'LoanApplication',
  data() {
    return {
      brokers: [],
      amount: null,
      time: null,
      purpose: '',
      con: false,
      broker: null,  // broker field added here
    };
  },
  computed: {
    filteredBrokers() {
      // Safeguard added for undefined parent
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.userinfo && this.$parent.$parent.userinfo.bank) {
        return this.brokers.filter(b => this.$parent.$parent.userinfo.bank == b.user.bank);
      } else {
        return [];
      }
    },
    average() {
      return this.amount && this.time ? this.amount / this.time : '';
    },
  },

  beforeCreate(){
    let token = localStorage.getItem('token')
    axios.get('http://localhost:3000/api/user/', {headers: {Authorization: 'Bearer ' + token }})
      .then(() => {
        this.con = true
        console.log("connected")
       })
        .catch(() => {
          this.con = false

          this.$router.push('/')
        })
  },

  created() {
    const token = localStorage.getItem("token")
    axios.get('http://localhost:3000/api/user/getAdmins', {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        this.brokers = response.data;
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    createLoan() {
      console.log(this.amount + ' ' + this.time + ' ' + this.broker + ' '+ ' ' + this.purpose)

      const token = localStorage.getItem("token")
      axios.post('http://localhost:3000/api/loan/create', {
        amount: this.amount,
        duration: this.time,
        broker: this.broker,
        purpose: this.purpose,
      }, {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        this.$router.push('/profile')
        this.$parent.$parent.createNotif("Succès", "Votre demande de prêt a été effectué", 1)
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
