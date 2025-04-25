<script setup>
import { ref, onMounted } from 'vue';
import PokemonCard from "./PokemonCard.vue";
import PokemonService from "../service/PokemonService.js";

const pokemonList = ref([]);

onMounted(() => {
  PokemonService.getPokemons()
      .then(pokemons => pokemonList.value = pokemons);
});

</script>

<template>
  <div class="container my-4">
    <div class="row">
        <PokemonCard :pokemonList="pokemonList"/>
    </div>
  </div>
</template>