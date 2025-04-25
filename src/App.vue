<script setup>
  import NavBar from './components/Navbar.vue';
  import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <NavBar/>
  <router-view />
  <FooterComponent/>
</template>
