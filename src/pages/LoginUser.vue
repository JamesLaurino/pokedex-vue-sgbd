<script setup>
import LoginForm from "../components/LoginForm.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="container d-flex justify-content-center mt-4">
    <h3 class="h3">{{t("connexion_form")}}</h3>
  </div>
  <div class="container d-flex justify-content-center">
    <LoginForm/>
  </div>
</template>