<script setup>
import {ref, watch} from "vue";
import PokemonService from "../service/PokemonService.js";
import '/src/assets/styles/material-style.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const pokemonList = ref([]);
const pokemonName = ref("")
let debounceTimeout = null;

watch(pokemonName, (newVal, oldVal) => {

  if (debounceTimeout)
  {
    clearTimeout(debounceTimeout);
  }

  if (newVal.length > 1) {

    debounceTimeout = setTimeout(function() {
      searchPokemon(newVal);
    }, 500);

  }
  else {
    pokemonList.value = [];
  }

});


function searchPokemon(pokemonName) {
  PokemonService.searchPokemon(pokemonName)
      .then(datas => {pokemonList.value = datas});
}

</script>

<template>
  <div class="container mt-3 shadow p-3" style="width: 800px">
      <div class="row justify-content-center">
        <div class="col-3 text-center">
          <div class="mat-input-field">
            <input type="text" v-model="pokemonName" class="mat-text" id="name" required>
            <label class="mat-label" for="name">{{t("find_one")}}</label>
          </div>
        </div>
        <div class="mt-4">
          <router-link class="btn btn-danger rounded-circle shadow floating-button" :to="`/pokemon/add`">+</router-link>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3 text-center" v-if="pokemonList.length > 0">
          <ul class="list-group list-group-flush">
            <router-link class="list-group-item text-dark h5" v-for="(pokemonItem,index) in pokemonList" :key="index"
                         :to="`/pokemon/${pokemonItem.id}/show`">
              {{pokemonItem.name}}
            </router-link>
          </ul>
        </div>
      </div>
    </div>
</template>