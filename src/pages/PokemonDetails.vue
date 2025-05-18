<script setup>
import { useRoute } from 'vue-router'
import {onMounted, ref} from "vue";
import PokemonService from "../service/PokemonService.js";
import TypeColorHelper from "../helpers/TypeColorHelper.js";
import '/src/assets/styles/spinner-style.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const route = useRoute();
const pokemonId = route.params.id;
const pokemon = ref(null);
const types = ref([]);

onMounted(() => {
  PokemonService.getPokemonById(pokemonId)
      .then(data => {
        pokemon.value = data
        types.value = pokemon.value.type.split(",")
      });
});
</script>


<template>
    <div v-if="pokemon" class="container shadow mt-5 d-flex flex-column justify-content-center" style="width: 500px; height: 500px">
      <div class="container d-flex justify-content-center">
        <p class="h2 text-black">{{pokemon.name}}</p>
      </div>
      <div class="container d-flex justify-content-center">
          <div>
            <img :src="pokemon.picture" :alt="pokemon.name"/>
          </div>
      </div>
      <div class="list-group">
        <a class="list-group-item list-group-item-action">HP : {{pokemon.hp}}</a>
        <a class="list-group-item list-group-item-action list-group-item-secondary">CP : {{pokemon.cp}}</a>
        <a class="list-group-item list-group-item-action mt-2">
          <span class="text-dark font-weight-bold rounded-circle mr-3 p-2" :style="{ backgroundColor: TypeColorHelper(type) }" v-for="(type,index) in types" :key="index">
            {{type}}
          </span>
        </a>
      </div>
      <div class="d-flex mt-2 justify-content-between">
        <router-link class="btn btn-dark mt-2" :to="`/pokemons`">{{ t('back') }}</router-link>
        <router-link class="mt-2 mr-3" :to="`/pokemon/${pokemon.id}/edit`">
          <svg class="bg-success p-1 rounded-circle" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </router-link>
      </div>
    </div>

  <div v-else class="d-flex justify-content-center align-items-center my-5">
    <div class="spinner"></div>
  </div>

</template>