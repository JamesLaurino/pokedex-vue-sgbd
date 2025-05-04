<script setup>
import {onMounted, onBeforeUnmount, computed, watch} from 'vue'
import SearchBar from "../components/SearchBar.vue"
import PokemonCard from "../components/PokemonCard.vue"
import '/src/assets/styles/spinner-style.css'
import { useI18n } from 'vue-i18n'
import PokemonService from "../service/PokemonService.js"

const { t } = useI18n()

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error
} = PokemonService.useInfinitePokemons()


const pokemonList = computed(() => {
  if (data.value?.pages) {
    return data.value.pages.flatMap(page => page.data);
  } else {
    return [];
  }
});

// Scroll infini
const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (scrollPosition >= documentHeight - 10 && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="container d-flex justify-content-center mt-3">
    <p class="h2">{{ t("pokedex") }}</p>
  </div>

  <div class="container d-flex justify-content-center">
    <SearchBar />
  </div>

  <div class="container my-4 mt-5">
    <div class="row">
      <PokemonCard :pokemonList="pokemonList" />
    </div>

    <div v-if="isLoading || isFetchingNextPage" class="d-flex justify-content-center my-4">
      <div class="spinner"></div>
    </div>

    <p v-if="!hasNextPage && !isLoading" class="text-center mt-4">{{ t('loading_pokemon') }}</p>
    <p v-if="error" class="text-danger text-center mt-4">Erreur : {{ error.message }}</p>
  </div>
</template>
