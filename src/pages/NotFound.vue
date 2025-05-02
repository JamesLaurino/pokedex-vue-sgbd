<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="container h3 d-flex justify-content-center mt-4">
    <p>{{t("not_found_page")}}</p>
  </div>
  <div class="container d-flex justify-content-center">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png" width="400px" height="400px" />
  </div>
</template>
