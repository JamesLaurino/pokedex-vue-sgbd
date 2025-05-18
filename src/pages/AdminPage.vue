<script setup>
import { useI18n } from 'vue-i18n';
import {onMounted, ref} from "vue";
import PokemonService from "../service/PokemonService.js";
import Spinner from "../components/shares/Spinner.vue";
import ModelDelete from "../components/shares/ModelDelete.vue";
const { t } = useI18n();

const start = ref(0)
const end = ref(6)
const offset = 6;
const isLoading = ref(false)
const noMoreData = ref(false)
const pokemonList = ref([])

onMounted(() => {
  PokemonService.fetchPokemonPagination(isLoading, noMoreData, pokemonList, start, end)
});

function next() {
  start.value += offset;
  end.value += offset;
  PokemonService.fetchPokemonPagination(isLoading, noMoreData, pokemonList, start, end)

}

function prev() {

  if(noMoreData.value === true) {
    start.value -= offset;
    end.value -= offset;
  }

  start.value -= offset;
  end.value -= offset;
  if(start.value >= 0)
    PokemonService.fetchPokemonPagination(isLoading, noMoreData, pokemonList, start, end)

}

</script>

<template>
  <div class="container d-flex justify-content-center mt-4 mb-4">
    <h3 class="h3">{{t("admin_page")}}</h3>
  </div>
  <div v-if="pokemonList.length > 0">
    <div class="container d-flex justify-content-center">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">CP</th>
          <th scope="col">HP</th>
          <th scope="col">Picture</th>
          <th scope="col">Types</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pokemon in pokemonList" :key="pokemon.id">
          <th scope="row">{{pokemon.id}}</th>
          <td>{{pokemon.name}}</td>
          <td>{{pokemon.cp}}</td>
          <td>{{pokemon.hp}}</td>
          <td>{{pokemon.picture.substring(58)}}</td>
          <td>{{pokemon.types.toString()}}</td>
          <td>
            <ModelDelete :id="pokemon.id"/>
            <router-link class="btn btn-dark ml-3" :to="`/pokemon/${pokemon.id}/edit`">{{t("edit")}}</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="container d-flex justify-content-center" >
      <div>
          <button :disabled="start<=0"  @click="prev" class=" btn btn-dark mr-3">{{t("prev")}}</button>
          <button :disabled="noMoreData" @click="next" class="btn btn-dark ml-3">{{t("next")}}</button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center my-4">
    <Spinner/>
  </div>
</template>
