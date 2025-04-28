<script setup>
import { ref, onMounted } from 'vue';
import PokemonCard from "../components/PokemonCard.vue";
import PokemonService from "../service/PokemonService.js";
import SearchBar from "../components/SearchBar.vue";

const pokemonList = ref([]);

onMounted(() => {
  PokemonService.getPokemons()
      .then(pokemons => pokemonList.value = pokemons);
});

</script>

<template>
  <SearchBar/>
  <div class="container my-4 mt-5">
    <div class="row">
        <PokemonCard :pokemonList="pokemonList"/>
    </div>
  </div>
</template>
