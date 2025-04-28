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
    <router-link class="btn btn-danger rounded-circle shadow floating-button" :to="`/pokemon/add`">+</router-link>
  </div>
</template>

<style>
.floating-button {
  position: fixed;
  bottom: 120px;
  right: 200px;
  width: 50px;
  height: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>