<script setup>

import {ref} from "vue";
import UserService from "../service/UserService.js";
import {useRouter} from "vue-router";
import { useI18n } from 'vue-i18n';
import BaseButton from "./shares/BaseButton.vue";
const { t } = useI18n();

//const user = ref('');
const userInput = ref({
  name: '',
  password: "",
})

const router = useRouter();

function connexion() {

  UserService.login(userInput)
      .then(data => {
        if(data.message === "Le mot de passe est incorrect.") {
          window.alert("Une erreur est survenue lors de la connexion");
          router.push({ path: '/login'});
        } else {
          UserService.setToken(data.token)
          window.alert("Connection effectuée avec success !")
          router.push({ path: '/pokemons'});
        }
      });
}

</script>

<template>
  <div class="container d-flex justify-content-center mt-4">
    <form @submit.prevent="connexion" style="max-width: 300px">
      <div class="form-group row mb-3">
        <div class="col-md-12">
          <div class="mat-input-field">
            <input type="text" v-model="userInput.name" class="mat-text" id="name" required>
            <label class="mat-label" for="name">{{t("username")}}</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mat-input-field">
            <input type="password" v-model="userInput.password" class="mat-text" id="password" required>
            <label class="mat-label" for="password">{{t("password")}}</label>
          </div>
        </div>
      </div>
      <BaseButton type="submit" className="btn btn-dark">
        {{t("login")}}
      </BaseButton>
    </form>
  </div>
</template>