<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import PokemonService from "../service/PokemonService.js";
import '/src/assets/styles/spinner-style.css';
import '/src/assets/styles/material-style.css';
import PokemonForm from "./PokemonForm.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const route = useRoute();
const pokemonId = route.params.id;
const pokemon = ref(null);

onMounted(() => {
  PokemonService.getPokemonById(pokemonId)
      .then(data => {pokemon.value = data});
});

</script>

<template>
  <div v-if="pokemon">
    <div class="container d-flex justify-content-center mt-4">
      <p class="h2">{{t("edit")}} {{pokemon.name}}</p>
    </div>
    <div class="container d-flex justify-content-center">
      <PokemonForm :pokemon="pokemon" :isEdit="true"/>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center my-5">
    <div class="spinner"></div>
  </div>
</template>