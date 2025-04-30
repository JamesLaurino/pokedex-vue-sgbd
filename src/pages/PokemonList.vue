<script setup>

import {ref, onMounted, onBeforeUnmount, watch} from 'vue'
import SearchBar from "../components/SearchBar.vue"
import PokemonCard from "../components/PokemonCard.vue"
import '/src/assets/styles/spinner-style.css';
import { useI18n } from 'vue-i18n';
import ToggleLang from "../components/ToggleLang.vue";
const { t } = useI18n();

const pokemonList = ref([])
const start = ref(0)
const limit = 6
const isLoading = ref(false)
const noMoreData = ref(false)

async function fetchPokemons() {
  if (isLoading.value || noMoreData.value) return

  isLoading.value = true
  try {
    const end = start.value + limit

    const dataApi = await fetch(`http://localhost:3001/pokemons?_start=${start.value}&_end=${end}`)
    const response = await dataApi.json();

    if (response.length === 0) {
      noMoreData.value = true
    } else {
      pokemonList.value.push(...response)
      start.value = end
    }
  } catch (error) {
    console.error('Erreur de chargement :', error)
  } finally {
    isLoading.value = false
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (scrollPosition >= documentHeight - 10) {
    fetchPokemons()
  }
}

onMounted(() => {
  fetchPokemons()
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <div class="container d-flex justify-content-center">
    <SearchBar />
  </div>
  <div class="container d-flex justify-content-center mt-3">
    <ToggleLang/>
  </div>
  <div class="container my-4 mt-5">
    <div class="row">
        <PokemonCard :pokemonList="pokemonList" />
    </div>

    <div v-if="isLoading" class="d-flex justify-content-center my-4">
      <div class="spinner"></div>
    </div>

    <p v-if="noMoreData" class="text-center mt-4">{{ t('loading_pokemon') }}</p>
  </div>
</template>
