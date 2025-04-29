<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import SearchBar from "../components/SearchBar.vue"
import axios from 'axios'
import PokemonCard from "../components/PokemonCard.vue"

const pokemonList = ref([])
const start = ref(0)
const limit = 6
const isLoading = ref(false)
const noMoreData = ref(false)

const fetchPokemons = async () => {
  if (isLoading.value || noMoreData.value) return

  isLoading.value = true
  try {
    const end = start.value + limit
    const response = await axios.get(`http://localhost:3001/pokemons?_start=${start.value}&_end=${end}`)

    if (response.data.length === 0) {
      noMoreData.value = true
    } else {
      pokemonList.value.push(...response.data)
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
  <SearchBar />
  <div class="container my-4 mt-5">
    <div class="row">
        <PokemonCard :pokemonList="pokemonList" />
    </div>

    <div v-if="isLoading" class="d-flex justify-content-center my-4">
      <div class="spinner"></div>
    </div>

    <p v-if="noMoreData" class="text-center mt-4">Plus de pokémons à charger.</p>
  </div>
</template>

<style scoped>
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #ccc;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

</style>