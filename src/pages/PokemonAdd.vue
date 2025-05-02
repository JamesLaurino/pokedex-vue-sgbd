<script setup>
import PokemonAdd from "../components/PokemonAdd.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<template>
  <div class="container d-flex justify-content-center mt-3">
    <h1 class="h4">{{t("form_add_pokemon")}}</h1>
  </div>
  <div class="container d-flex justify-content-center mt-3 mb-5">
    <PokemonAdd/>
  </div>
</template>
