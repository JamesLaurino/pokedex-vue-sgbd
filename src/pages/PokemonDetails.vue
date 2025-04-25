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

  <div v-if="pokemon" class="container d-flex justify-content-center mt-5">
      <div>
        <img :src="pokemon.picture" :alt="pokemon.name"/>
      </div>
       <div class="mt-3 ml-2">
            <p class="h5 text-success">{{pokemon.name}}</p>
           <div>
             <p>HP : {{pokemon.hp}}</p>
             <p>CP : {{pokemon.cp}}</p>
           </div>
           <div class="d-flex">
             <p class="mr-3" v-for="(type,index) in pokemon.types" :key="index">{{type}}</p>
           </div>
         <div>
           <router-link class="text-dark h4" :to="`/pokemons`">Retour</router-link>
         </div>
      </div>
  </div>

  <div v-else>
    loading
  </div>

</template>