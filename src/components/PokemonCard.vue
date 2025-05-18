<script setup>

defineProps({
  pokemonList: {
    type:Array,
    required:true
  }
})

</script>

<template>
  <transition-group name="fade" tag="div" class="row">
    <div style="max-width: 350px"
         class="col-md-4 mb-4 shadow mr-3 pokemon-card"
         v-for="pokemon in pokemonList" :key="pokemon.id">
      <div class="container d-flex justify-content-center">
        <p class="h4 mt-2">{{pokemon.name}}</p>
      </div>
      <div class="container d-flex justify-content-center">
        <router-link class="text-dark h5" :to="`/pokemon/${pokemon.id}/show`">
          <img :src="pokemon.picture" :alt="pokemon.name"/>
        </router-link>
      </div>
    </div>
  </transition-group>
</template>

<style scoped>

.pokemon-card {
  border: 6px solid transparent;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.pokemon-card:hover {
  border-color: green;
  box-shadow: 0 0 12px rgba(0, 128, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>