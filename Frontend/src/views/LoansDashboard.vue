<template>
  <p></p>
  <section v-if="con" class="container px-4 my-20 mx-2 sm:mx-auto">
    <div class="flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h1 class="text-3xl bold px-8 mt-4 mb-8">Panneau d'administration :</h1>
        <div class="flex justify-around w-full my-4 sm:w-1/2 mx-8 mt-4">
              <h3 class="py-1">Filters:</h3>
              <input v-on:click="this.filterRef = !this.filterRef" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'Refusé' + (filterRef ? ' ✅' : ' ❌')" :class="{'border-green-300': filterRef, 'border-red-300': !filterRef}">
              <input v-on:click="this.filterWai = !this.filterWai" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'En attente' + (filterWai ? ' ✅' : ' ❌')" :class="{'border-green-300': filterWai, 'border-red-300': !filterWai}">
              <input v-on:click="this.filterAcc = !this.filterAcc" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'Accepté' + (filterAcc ? ' ✅' : ' ❌')" :class="{'border-green-300': filterAcc, 'border-red-300': !filterAcc}">
              <input type="button" value="Chercher 🔎" class="py-1 cursor-pointer px-8 rounded border" v-on:click="filter()">
            </div>
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          
          <div class="overflow-hidden border border-gray-200  md:rounded-lg">
            
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50" v-if="loans">
                <tr>
                  <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                    <div class="flex items-center gap-x-3">
                      <input type="checkbox" class="text-blue-500 border-gray-300 rounded">
                      <button class="flex items-center gap-x-2">
                        <span>Date</span>

             
                      </button>
                    </div>
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500" >
                    But
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    État
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Client
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Montant
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Durée
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Avancement
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Messagerie
                  </th>

                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="!this.loading" class="bg-white divide-y divide-gray-200 w-full">
                <h1 v-if="!filtered.length" class="w-full py-4 px-4">Aucun prêt chargé ...</h1>
                <tr v-for="item in filtered" :key="item.loan._id">
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div class="inline-flex items-center gap-x-3">
                      <input type="checkbox" class="text-blue-500 border-gray-300 rounded">
                      <span>{{ item.loan.askedDate }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap" ><p class="w-28 overflow-hidden text-ellipsis">{{ item.loan.purpose }}</p></td>
                  <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <StatusComp :status="item.loan.status"></StatusComp>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div class="flex items-center gap-x-2">
                      <img class="object-cover w-8 h-8 rounded-full" :src="item.user.pp" alt="">
                      <div>
                        <h2 class="text-sm font-medium text-gray-800">{{ item.user.firstName }} {{ item.user.lastName }}</h2>
                        <p class="text-xs font-normal text-gray-600">{{ item.user.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.loan.amount }} €</td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.loan.duration }} months</td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex justify-evenly mt-2 ">
                    <div class="border rounded-xl h-4 p-auto aspect-square	" :class="{'bg-green-500': item.loan.validation[0] == 2, 'bg-yellow-500': item.loan.validation[0] == 1, 'bg-red-500': item.loan.validation[0] == 0}" ></div>
                    <div class="border rounded-xl h-4 p-auto aspect-square	" :class="{'bg-green-500': item.loan.validation[1] == 2, 'bg-yellow-500': item.loan.validation[1] == 1, 'bg-red-500': item.loan.validation[1] == 0}"></div>
                    <div class="border rounded-xl h-4 p-auto aspect-square	" :class="{'bg-green-500': item.loan.validation[2] == 2, 'bg-yellow-500': item.loan.validation[2] == 1, 'bg-red-500': item.loan.validation[2] == 0}"></div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap justify-center items-center">
                    <svg v-on:click="this.$router.push(`/messages/${item.loan._id}`)" class="mx-2 h-6 cursor-pointer" fill="#000000" viewBox="0 0 1920.00 1920.00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="19.2"></g><g id="SVGRepo_iconCarrier"> <path d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" fill-rule="evenodd"></path> </g></svg>

                  </td>

                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div class="flex items-center">
                      <router-link class="text-gray-500 transition-colors duration-200 focus:outline-none rounded border p-2 px-6" :to="{ name: 'DocumentValidation', params: { id: item.loan._id } }">View Document</router-link>



                      <button v-if="item.loan.status == 'pending'" @click="acceptLoan(item.loan._id)" class="ml-8 p-1 px-2 rounded border" :class="{'bg-green-100' : item.loan.validation[0] == 2 && item.loan.validation[1] == 2 && item.loan.validation[2] == 2, 'bg-gray-100' : !item.loan.validation[0] || !item.loan.validation[1] || !item.loan.validation[2]}">   <svg class="h-6 " :class="{'text-green-500': item.loan.validation.every(val => val === 2), 'text-gray-500': !item.loan.validation.every(val => val === 2)}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg></button>
                      <button v-if="item.loan.status == 'pending'" @click="refuseLoan(item.loan._id)" class="bg-red-100 ml-2 p-1 px-2 rounded border">   <svg class="h-6" :class="{'text-red-500': item.loan.validation.every(val => val === 2), 'text-gray-500': !item.loan.validation.every(val => val === 2)}" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path> </g></svg></button>
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
            <div v-if="loading" class="w-full flex justify-center">
                <div  class="mt-4 mb-4 h-12 w-12 lds-ring"><div></div><div></div><div></div><div></div></div>

              </div>
          </div>
        </div>
      </div>
    </div>

    
  </section>

</template>
<script>

import StatusComp from "@/components/StatusComp.vue";
const axios = require('axios');

export default {
  name: 'LoansDashboard',
  components: {
    StatusComp

  },
  
  props: {
  
  },

  data () {
    return {
        loans: [],
        filterRef: true,
        filterWai: true,
        filterAcc: true,
        filtered: [],
        loading: true,
        con: false
    }
  },

  beforeCreate(){
    let token = localStorage.getItem('token')
    axios.get('http://localhost:3000/api/user/isAdmin', {headers: {Authorization: 'Bearer ' + token }})
      .then(res => {
        if(!res.data){
          this.con = false

          this.$router.push('/')
          return
        }
        this.con = true
        console.log("connected")
       })
        .catch(() => {
          this.con = false

          this.$router.push('/')
        })
  },


  async created() {
    this.fetch();


        
  },

  
  methods: {

    fetch(){
      const token = localStorage.getItem('token');

      axios.get('http://localhost:3000/api/loan', {headers: {Authorization: 'Bearer ' + token }})
        .then(response => {
          this.loans = response.data;
          this.filtered = this.loans;
          this.loading = false

        })
          .catch(error => {
            this.loading = false

            console.log(error)
          })
      
      console.log(this.loans)
    },

    filter() {
      let newLoans = [];
      for (let i = 0; i < this.loans.length; i++) {
        const loan = this.loans[i];
        if ((this.filterRef && loan.loan.status === 'rejected') ||
            (this.filterAcc && loan.loan.status === 'accepted') ||
            (this.filterWai && loan.loan.status === 'pending')) {
          newLoans.push(loan);
        }
      }
      this.filtered = newLoans;
    },

    acceptLoan(loanid){
      let loanId = loanid; // replace with actual loan id

      axios.put(`http://localhost:3000/api/loan/accept/${loanId}`, {
        reason: '',
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      })
      .then((response) => {
        this.$parent.$parent.createNotif("Succès", "Demande accepté", 1)
        this.fetch()
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
    },

    refuseLoan(loanid){
      let loanId = loanid; // replace with actual loan id

      axios.put(`http://localhost:3000/api/loan/refuse/${loanId}`, {
        reason: '',
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      })
      .then((response) => {
        this.fetch()
        this.$parent.$parent.createNotif("Succès", "Demande refusé", 1)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
    }




  },
}
</script>

<style scoped>

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #0d68b4;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #0d68b4 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>


