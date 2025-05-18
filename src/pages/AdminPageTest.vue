<script setup>

import {useI18n} from 'vue-i18n';
import {computed, onMounted, ref} from "vue";
import Spinner from "../components/shares/Spinner.vue";
import ModelDelete from "../components/shares/ModelDelete.vue";
import PageService from "../service/PageService.js";

const { t } = useI18n();

const total = ref(0)
const page = ref(1)
const pokemonList = ref([])

onMounted(() => {
  PageService.getPage(page.value)
      .then(data => {
        pokemonList.value = data.pokemon
        total.value = data.total
      });
});

function next() {
  if(page.value < total.value) {
    page.value += 1;
    PageService.getPage(page.value).then(pokemons =>
    pokemonList.value = pokemons.pokemon)
  }
}

function prev() {
  if(page.value > 1) {
    page.value  -= 1;
    PageService.getPage(page.value).then(pokemons =>
        pokemonList.value = pokemons.pokemon)
  }
}

function onPage(pageCurrent) {
  page.value = pageCurrent;
  PageService.getPage(pageCurrent).then(pokemons =>
      pokemonList.value = pokemons.pokemon)
}

const paginationItems = computed(() => {
  const items = []
  let dotsShown = false

  for (let i = 1; i <= total.value; i++) {
    if (i === 1 || i === 2 || i === total.value || i === total.value - 1 || Math.abs(i - page.value) <= 1) {
      items.push(i)
      dotsShown = false
    } else {
      if (!dotsShown) {
        items.push('...')
        dotsShown = true
      }
    }
  }

  return items
})

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
          <td>{{pokemon.type}}</td>
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
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a @click="prev" class="page-link" aria-label="Previous">
                <span class="text-dark" aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item" v-for="(i, index) in paginationItems" :key="index">
              <span v-if="i === '...'" class="page-link text-dark">...</span>
              <a v-else @click="onPage(i)" :class="{ 'bg-secondary': page === i }" class="page-link text-dark">{{ i }}</a>
            </li>

            <li class="page-item">
              <a @click="next" class="page-link"  aria-label="Next">
                <span class="text-dark" aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center my-4">
    <Spinner/>
  </div>
</template>

<style scoped>

.page-link{
  cursor: pointer;
}

</style>