<template>
  <div
      className="flex-1 p:2 sm:py-6 justify-between flex flex-col h-screen block"
      style="margin-top: 35px; height: calc(100vh - 35px)"
  >
    <div
        className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200" style="padding: 1.3rem;"
    >
      <div
          className="w-2/6 h-full sm:flex justify-center items-center text-sm sm:text-lg"
      >
        <strong>But :</strong>
        <p className="ml-0 sm:ml-2 text-ellipsis overflow-hidden w-3/4">
          {{ loanInfo.purpose }}
        </p>
      </div>
      <div
          className="w-2/6 h-full sm:flex justify-center items-center text-sm sm:text-lg"
      >
        <strong>Durée :</strong>
        <p className="ml-0 sm:ml-2 text-ellipsis overflow-hidden w-3/4">
          {{ loanInfo.duration }} mois
        </p>
      </div>
      <div
          className="w-2/6 h-full sm:flex justify-center items-center text-sm sm:text-lg"
      >
        <strong>Montant :</strong>
        <p className="ml-0 sm:ml-2 text-ellipsis overflow-hidden w-3/4">
          {{ loanInfo.amount }} €
        </p>
      </div>
    </div>
    <div
        id="messages"
        style="min-height:71vh;"
        className="flex flex-col bg-gradient-to-r pt-20  from-white to-gray-300 space-y-14 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >

      <MessageComp v-for="item in messages" :key="item" :msg="item"/>
    </div>
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">

        <input
            type="text" v-model="messageContent"
            placeholder="Écrivez votre message !"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">

          <button
              type="button"
              v-on:click="this.sendMsg(messageContent, this.$route.params.id); messageContent = ''"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-700 hover:bg-blue-800 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import MessageComp from "@/components/MessageComp.vue";

export default {
  name: "MessageView",
  components: {MessageComp},
  props: {},

  data() {
    return {
      messages: [],
      loanInfo: "",
    };
  },

  created() {
    this.token = localStorage.getItem("token");

    axios
        .get("http://localhost:3000/api/loan/" + this.$route.params.id + "/", {
          headers: {Authorization: "Bearer " + this.token},
        })
        .then((response) => {
          this.loanInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    this.fetchMessages = () => {
      axios
          .get(
              "http://localhost:3000/api/messages/" + this.$route.params.id + "/",
              {headers: {Authorization: "Bearer " + this.token}}
          )
          .then((response) => {
            if (this.messages != response.data) {
              this.messages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            }
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
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
    sendMsg(content, loanId) {
      let token = localStorage.getItem("token");

      axios
          .post(
              "http://localhost:3000/api/message/send",
              {content, loanId},
              {headers: {Authorization: "Bearer " + token}}
          )
          .then(() => {
            axios
                .get(
                    "http://localhost:3000/api/messages/" +
                    this.$route.params.id +
                    "/",
                    {headers: {Authorization: "Bearer " + this.token}}
                )
                .then((response) => {
                  if (this.messages != response.data) {
                    this.messages = response.data;
                  }
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
          })

          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>

