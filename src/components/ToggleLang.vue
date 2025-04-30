<script setup>
import { useI18n } from 'vue-i18n';
import {ref, watch} from "vue";
const { locale } = useI18n();

const isEnglish = ref(locale.value === 'en');

watch(isEnglish, (val) => {
  locale.value = val ? 'en' : 'fr';
});

</script>

<template>
  <div class="lang-toggle-wrapper">
    <input type="checkbox" id="lang-toggle" v-model="isEnglish" class="lang-toggle-checkbox" />
    <label for="lang-toggle" class="lang-toggle-label">
      <span class="lang-toggle-ball"></span>
      <span class="lang-label left" :class="{ active: !isEnglish }">FR</span>
      <span class="lang-label right" :class="{ active: isEnglish }">EN</span>
    </label>
  </div>
</template>

<style scoped>
.lang-toggle-wrapper {
  position: relative;
  width: 80px;
  height: 34px;
}

.lang-toggle-checkbox {
  display: none;
}

.lang-toggle-label {
  display: block;
  width: 100%;
  height: 100%;
  background: #ddd;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.lang-toggle-ball {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  z-index: 2;
}

.lang-toggle-checkbox:checked + .lang-toggle-label {
  background: #333;
}

.lang-toggle-checkbox:checked + .lang-toggle-label .lang-toggle-ball {
  transform: translateX(44px);
}

.lang-label {
  position: absolute;
  top: 5px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
  color: #999; /* inactif par défaut */
  transition: color 0.3s;
}

.lang-label.active {
  color: #000; /* actif en noir */
}

.lang-label.left {
  left: 10px;
}

.lang-label.right {
  right: 10px;
}
</style>