<template>
  <div class="relative flex flex-col pt-16 h-full w-full my-auto bg-gray-200 rounded-lg shadow-lg ">
    <!-- Header -->
    <div class="w-full h-1/6 bg-gray-400 shadow-md">
      <div class="w-full h-full flex justify-between items-center">
        <div class="w-2/6 h-full flex justify-center items-center ">
          <strong>Purpose :</strong>
          <p class="ml-2 text-ellipsis overflow-hidden w-3/4">{{loanInfo.purpose}}</p>

        </div>
        <div class="w-2/6 h-full flex justify-center items-center">
          <strong>Duration :</strong>
          <p class="ml-2"> {{loanInfo.duration}} Months</p>
        </div>
        <div class="w-2/6 h-full flex justify-center items-center">
          <strong>Amount :</strong>
          <p class="ml-2"> {{loanInfo.amount}} €</p>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="w-full h-4/6 flex flex-col px-10 overflow-y-scroll pb-12 " style="flex-direction: column-reverse;">
      <MessageComp v-for="item in messages" :key="item" :msg="item"  />

    </div>
    <!-- Footer -->
    <div class="w-full h-1/6 flex p-2 justify-center items-center shadow-inner " >
      <input v-model="messageContent" type="text" class="shadow-lg mx-auto block w-5/6 py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Write a message here ... ">
      <div v-on:click="this.sendMsg(messageContent, this.$route.params.id); messageContent = ''" class="bg-myBlue rounded rounded-lg mx-auto w-12 shadow-lg hover:border border-myDarkBlue ease-all">
        <img class="mx-auto w-10 h-10" src="../assets/send.svg" alt="">
      </div>

    </div>


  </div>
</template>

<script>
const axios = require('axios');

import MessageComp from "@/components/MessageComp.vue";

export default {
  name: 'MessageView',
  components: {MessageComp},
  props: {

  },

  data(){
    return {
      messages: [],
      loanInfo: ''
    }
  },

  created() {
    this.token = localStorage.getItem("token")

    axios.get('http://localhost:3000/api/loan/' + this.$route.params.id + '/', {headers: {Authorization: 'Bearer ' + this.token }})
            .then(response => {
              this.loanInfo = response.data;
            })
            .catch(error => {
                console.log(error)
            })

    this.fetchMessages = () => {
        axios.get('http://localhost:3000/api/messages/' + this.$route.params.id + '/', {headers: {Authorization: 'Bearer ' + this.token }})
            .then(response => {
              if(this.messages != response.data){
                this.messages = response.data;
              }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    };

      this.fetchMessages(); // Fetch messages immediately on component creation

      // Set up a timer to fetch messages every second
      this.timer = setInterval(this.fetchMessages, 1000);
  },

  beforeUnmount() {
      // Clear the timer when the component is destroyed to prevent memory leaks
      clearInterval(this.timer);
  },


  methods: {
    
    sendMsg(content, loanId){
      let token = localStorage.getItem("token")

      axios.post('http://localhost:3000/api/message/send', { content, loanId }, {headers: {Authorization: 'Bearer ' + token }})
        .then(() => {
          axios.get('http://localhost:3000/api/messages/' + this.$route.params.id + '/', {headers: {Authorization: 'Bearer ' + this.token }})
            .then(response => {
              if(this.messages != response.data){
                this.messages = response.data;
              }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        })

        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
