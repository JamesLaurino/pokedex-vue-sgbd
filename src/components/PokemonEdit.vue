<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import PokemonService from "../service/PokemonService.js";

const route = useRoute();
const pokemonId = route.params.id;
const pokemon = ref(null);

onMounted(() => {
  console.log(pokemonId)
  PokemonService.getPokemonById(pokemonId)
      .then(data => {pokemon.value = data});
});


</script>

<template>
  <div v-if="pokemon">
    <div class="container d-flex justify-content-center mt-4">
      <p class="h4">Formulaire d'édition d'un pokémon : {{pokemon.name}}</p>
    </div>

  </div>
</template>

<style scoped>

</style>