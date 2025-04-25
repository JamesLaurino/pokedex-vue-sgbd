<script setup>
  import NavBar from './components/Navbar.vue';
  import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar />

    <main class="flex-grow-1">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>
