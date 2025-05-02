<script setup>
import { useI18n } from 'vue-i18n';
import ToggleLang from "./ToggleLang.vue";
const { t } = useI18n();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #397850">
    <router-link class="navbar-brand"  :to="`/pokemons`">
      <img src="../assets/pokeball.png" width="40px" height="40px"/>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link"  :to="`/pokemons`">
            {{t("pokedex")}}
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
            {{t("action")}}
          </a>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" :to="`/pokemons`">
              {{t("list_pokemon")}}
            </router-link>
            <router-link class="dropdown-item" :to="`/pokemon/add`">
              {{ t("form_add_pokemon") }}
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link class="dropdown-item" :to="`/login`">
              {{t("login")}}
            </router-link>
          </div>
        </li>
      </ul>
      <ToggleLang/>
    </div>
  </nav>
</template>