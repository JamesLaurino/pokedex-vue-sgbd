<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<template>
  <footer class="bg-dark text-white pt-4 pb-4 mt-4">
    <div class="container text-center">
      <div class="mb-3">
        <a href="https://www.facebook.com" target="_blank" class="text-white mx-2">
          <i class="bi bi-facebook fs-4"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" class="text-white mx-2">
          <i class="bi bi-linkedin fs-4"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" class="text-white mx-2">
          <i class="bi bi-twitter fs-4"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" class="text-white mx-2">
          <i class="bi bi-instagram fs-4"></i>
        </a>
      </div>
      <p class="mb-0">{{ t("copyright")}}</p>
    </div>
  </footer>
</template>