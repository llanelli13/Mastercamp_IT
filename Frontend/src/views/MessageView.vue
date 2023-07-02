<template>
  <div class="relative flex flex-col pt-16 h-full w-full my-auto bg-gray-200 rounded-lg shadow-lg ">
    <!-- Header -->
    <div class="w-full h-1/6 bg-gray-400 shadow-md">
      <div class="w-full h-full flex justify-between items-center">
        <div class="w-2/6 h-full flex justify-center items-center">
          <strong>Purpose :</strong>
          <p>_purpose</p>

        </div>
        <div class="w-2/6 h-full flex justify-center items-center">
          <strong>Duration :</strong>
          <p>_duration</p>
        </div>
        <div class="w-2/6 h-full flex justify-center items-center">
          <strong>Amount :</strong>
          <p>_amount</p>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="w-full h-4/6 flex flex-col px-10 overflow-y-scroll">

      <MessageComp  msg="Yes poto" :side="false"  />
      <MessageComp  msg="Sisi la famille" :side="true"  />

    </div>
    <!-- Footer -->
    <div class="w-full h-1/6 flex p-2 justify-center items-center shadow-inner ">
      <input v-model="messageContent" type="text" class="shadow-lg mx-auto block w-5/6 py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Write a message here ... ">
      <div class="bg-myBlue rounded rounded-lg mx-auto w-12 shadow-lg hover:border border-myDarkBlue ease-all">
        <img class="mx-auto w-10 h-10" src="../assets/send.svg" alt="">
      </div>

    </div>


  </div>
</template>

<script>
import MessageComp from "@/components/MessageComp.vue";

export default {
  name: 'MessageView',
  components: {MessageComp},
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
