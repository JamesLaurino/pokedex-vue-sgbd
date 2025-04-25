<script setup>
defineProps({
  pokemonList: {
    type:Array,
    required:true
  }
})
</script>

<template>
  <div class="col-md-4 mb-4" v-for="pokemon in pokemonList" :key="pokemon.id">
    <div class="container d-flex">
      <div class="">
        <img :src="pokemon.picture" :alt="pokemon.name"/>
      </div>
      <div class="mt-3 ml-2">
        <p class="h5">{{pokemon.name}}</p>
        <div class="">
          <p>HP : {{pokemon.hp}}</p>
          <p>CP : {{pokemon.cp}}</p>
        </div>
        <div class="d-flex">
          <p class="mr-3" v-for="(type,index) in pokemon.types" :key="index">{{type}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
