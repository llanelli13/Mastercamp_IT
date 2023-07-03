<template>
  <section class="container px-4 my-20 mx-2 sm:mx-auto">
    <div class="flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h1 class="text-3xl bold px-8 mt-4 mb-8">Administration Panel :</h1>
        <div class="flex justify-around w-full my-4 sm:w-1/2 mx-8 mt-4">
              <h3 class="py-1">Filters:</h3>
              <input v-on:click="this.filterRef = !this.filterRef" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'Refused' + (filterRef ? ' ✅' : ' ❌')" :class="{'border-green-300': filterRef, 'border-red-300': !filterRef}">
              <input v-on:click="this.filterWai = !this.filterWai" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'Waiting' + (filterWai ? ' ✅' : ' ❌')" :class="{'border-green-300': filterWai, 'border-red-300': !filterWai}">
              <input v-on:click="this.filterAcc = !this.filterAcc" type="button" class="py-1 cursor-pointer px-4 rounded border" :value="'Accepted' + (filterAcc ? ' ✅' : ' ❌')" :class="{'border-green-300': filterAcc, 'border-red-300': !filterAcc}">
              <input type="button" value="Search 🔎" class="py-1 cursor-pointer px-8 rounded border" v-on:click="filter()">
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
                    Purpose
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Status
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Customer
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Amount
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Duration
                  </th>
                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                    Validation
                  </th>

                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 w-full">
                <h1 v-if="!filtered.length" class="w-full py-4 px-4">0 loan loaded...</h1>
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
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div class="flex items-center gap-x-6">
                      <router-link class="text-gray-500 transition-colors duration-200 focus:outline-none rounded border p-2 px-6" :to="{ name: 'DocumentValidation', params: { id: item.loan._id } }">View Document</router-link>

                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
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

    }
  },


  async created() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/api/loan', {headers: {Authorization: 'Bearer ' + token }})
      .then(response => {
        this.loans = response.data;
        this.filtered = this.loans;
       })
        .catch(error => {
          console.log(error)
        })
    
    console.log(this.loans)


        
  },

  
  methods: {

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




  },
}
</script>


