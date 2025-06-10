<script>

  import Navbar from './components/Navbar.vue'

  export default {
    components: {
      Navbar,
    }
  }

</script>

<template>
<main>
  <router-view />
</main>
<Navbar />

</template>
<style scoped>
*{

  font-family: 'Poppins', sans-serif;



}
</style>
