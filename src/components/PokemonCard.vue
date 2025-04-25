<script setup>
import {ref} from "vue";

defineProps({
  pokemonList: {
    type:Array,
    required:true
  }
})

let isActive = ref(false)

function handleMouseEnter() {
  console.log('enter ');
  isActive.value = true;
}

function handleMouseLeave() {
  console.log("leave")
  isActive.value = false;
}

</script>

<template>
  <div id="card" :class="{'card-hover': isActive}" class="col-md-4 mb-4" v-for="pokemon in pokemonList" :key="pokemon.id"
       @mouseover="handleMouseEnter"
       @mouseleave="handleMouseLeave">
    <div class="container d-flex justify-content-center">
      <p class="h4">{{pokemon.name}}</p>
    </div>
    <div class="container d-flex justify-content-center">
      <router-link class="text-dark h5" :to="`/pokemon/${pokemon.id}/show`">
        <img :src="pokemon.picture" :alt="pokemon.name"/>
      </router-link>
    </div>
  </div>
</template>

<style>

.card-hover {
  border: 5px solid transparent;
  border-radius: 8px;
  padding: 8px;
}

.card-hover:hover {
  border-color: green;
}
</style>