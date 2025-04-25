<script setup>
  import NavBar from './components/Navbar.vue';
  import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div>
    <NavBar/>
    <router-view />
    <div class="">
      <FooterComponent/>
    </div>
  </div>
</template>
