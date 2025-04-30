<script setup>

import {ref} from "vue";
import '/src/assets/styles/material-style.css';
import PokemonForm from "./PokemonForm.vue";

const pokemon = ref({
  name: '',
  hp: 0,
  cp: 0,
  picture: '',
  types: []
})

</script>

<template>
  <div class="container d-flex justify-content-center">
    <PokemonForm :pokemon="pokemon" :isEdit="false" />
  </div>
</template>
