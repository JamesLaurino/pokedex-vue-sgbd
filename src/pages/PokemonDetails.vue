<script setup>
import { useRoute } from 'vue-router'
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
    <div v-if="pokemon" class="container shadow mt-3 d-flex flex-column justify-content-center" style="width: 500px; height: 500px">
      <div class="container d-flex justify-content-center">
        <p class="h2 text-black">{{pokemon.name}}</p>
      </div>
      <div class="container d-flex justify-content-center">
          <div>
            <img :src="pokemon.picture" :alt="pokemon.name"/>
          </div>
      </div>
      <div class="list-group">
        <a class="list-group-item list-group-item-action list-group-item-secondary">HP : {{pokemon.hp}}</a>
        <a class="list-group-item list-group-item-action">CP : {{pokemon.cp}}</a>
        <a class="list-group-item list-group-item-action list-group-item-secondary">
            TYPES : {{pokemon.types.join(" & ")}}
        </a>
      </div>
      <div class="d-flex mt-2 justify-content-between">
        <router-link class="btn btn-dark mt-2" :to="`/pokemons`">Retour</router-link>
        <router-link class="mt-2" :to="`/pokemon/${pokemon.id}/edit`">
          <svg class="bg-success shadow rounded-circle p-1" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#1f1f1f"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </router-link>
      </div>
    </div>

  <div v-else>
    loading
  </div>

</template>