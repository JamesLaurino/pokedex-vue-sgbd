<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import PokemonService from "../service/PokemonService.js";
import TypeColorHelper from "../helpers/TypeColorHelper.js";
import '/src/assets/styles/material-style.css';
import { useI18n } from 'vue-i18n';
import BaseButton from "./shares/BaseButton.vue";
const { t } = useI18n();

const { pokemon, isEdit } = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  }
})

const urlPattern = /^https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/[0-9]{3}\.png$/;

const error = ref({
  "name":false,
  "picture":false,
  "cp":false,
  "hp":false,
  "type":false
})
const router = useRouter();

function submitPokemon() {

  Object.keys(error.value).forEach(key => {
    error.value[key] = false
  })

  try
  {
    checkType()
    checkName();
    checkPicture();
    checkCP();
    checkHP();

    const hasError = Object.values(error.value).some(val => val === true);
    if(!hasError) {
      if(isEdit) {
        PokemonService.updatePokemon(pokemon);
      }
      else {
        PokemonService.addPokemon(pokemon);
      }
      window.alert("Opération effectuée avec succés");
      router.push({ path: '/pokemons'});
    }
  }
  catch (e) {
    window.alert("Une erreur est survenue");
  }
}
function checkName() {
  if(pokemon.name.length <= 2) {
    error.value.name = true;
  }
}
function checkHP() {
  if(pokemon.hp <= 0) {
    error.value.hp = true;
  }
}
function checkCP() {
  if(pokemon.cp <= 0) {
    error.value.cp = true;
  }
}
function checkPicture() {
  if(!urlPattern.test(pokemon.picture)) {
    error.value.picture = true;
  }
}
function checkType() {

  try {
    if(pokemon.types.length > 2 || pokemon.types.length <= 0) {
      error.value.type = true;
    }
  }catch (e) {
    error.value.type = true;
  }
}

function handleMessage(message) {
  console.log("Message reçu depuis le composant enfant : " + message);
}

</script>

<template>
  <form @submit.prevent="submitPokemon">
    <div class="form-group row mb-3">
      <div class="col-md-12">
        <div class="mat-input-field">
          <input  v-model="pokemon.name" type="text" class="mat-text" id="name" required>
          <label class="mat-label" for="name">{{t("pokemon_name")}}</label>
          <span v-if="error.name" class="error mt-1">{{t("length_name")}}</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="mat-input-field">
          <input v-if="pokemon.picture"  v-model="pokemon.picture" type="text"
                  class="mat-text" id="picture" required>

          <input v-else v-model="pokemon.picture" type="text"
                 class="mat-text" id="picture"
                 placeholder="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png"
                 required/>

          <label class="mat-label" for="picture">{{t("picture_pokemon")}}</label>
          <span v-if="error.picture" class="error mt-1">{{t("format_asset")}}</span>
        </div>
      </div>
    </div>

    <div class="form-group row mb-3">
      <div class="col-md-4">
        <label for="hp" class="form-label">HP</label>
        <input v-model.number="pokemon.hp" type="number" class="form-control" id="hp" required>
        <span v-if="error.hp" class="error mt-1">{{t("format_hp")}}</span>
      </div>
      <div class="col-md-6">
        <label for="cp" class="form-label">CP</label>
        <input v-model.number="pokemon.cp" type="number" class="form-control" id="cp" required>
        <span v-if="error.cp" class="error mt-1">{{t("format_cp")}}</span>
      </div>
    </div>

    <div class="form-group mb-3">
        <span v-for="(type,index) in PokemonService.typesPokemon()" :key="index">
          <input type="checkbox" v-model="pokemon.types" :id="index" :name="type" :value="type">
          <label :for="index" class="p-1 mr-3 ml-2 rounded-circle p-1"
                 :style="{ backgroundColor: TypeColorHelper(type) }">{{type}}</label>
        </span>
      <div v-if="error.type" class="error mb-1">{{t("check_type")}}</div>
    </div>

    <BaseButton type="submit" className="btn btn-success" @msg="handleMessage" >
      {{t("submit")}}
    </BaseButton>

    <router-link class="btn btn-dark ml-3" :to="`/pokemons`">{{t("back")}}</router-link>
  </form>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}
</style>