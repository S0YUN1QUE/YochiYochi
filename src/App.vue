<template>
  <!-- <vueNavigationBar :options="navigationData" /> -->
  <Navbar />
  <router-view />
</template>

<script>
// import Header from "./components/common/Header.vue";
// import vueNavigationBar from "vue-navigation-bar/src/vue-navigation-bar.vue";
import Navbar from './components/common/Navbar.vue'

export default {
  name: "App",
  components: {
    // Header,
    Navbar
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cute+Font&family=Hachi+Maru+Pop&display=swap');
  #app {
    padding: 2rem 0 0 0;
    margin: 0 auto;
    width: 100%;
    /* font-family: 'Cute Font', cursive; */
    font-family: 'Hachi Maru Pop', 'Cute Font';
  }
</style>