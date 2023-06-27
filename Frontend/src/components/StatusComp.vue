<template>

  <div v-if="status == 'rejected'" class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 ">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <h2 class="text-sm font-normal">Rejected</h2>
  </div>
  <div v-if="status == 'pending'" class="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-300/60 ">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <h2 class="text-sm font-normal">Waiting</h2>
  </div>
  <div v-if="status == 'accepted'" class="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-green-300/60 ">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <h2 class="text-sm font-normal">Accepted</h2>
  </div>

</template>

<script>
export default {
  name: 'StatusComp',
  props: {
    status : String
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
