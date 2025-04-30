<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import PokemonService from "../service/PokemonService.js";
import TypeColorHelper from "../helpers/TypeColorHelper.js";
import '/src/assets/styles/material-style.css';

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
const typePokemon = ref([...pokemon.types])

function submitPokemon() {
  try
  {
    mapTypes()
    checkName();
    checkPicture();
    checkCP();
    checkHP();

    const hasError = Object.values(error.value).some(val => val === true);
    if(!hasError) {
      if(isEdit) {
        //PokemonService.updatePokemon(pokemon);
      }
      else {
        //PokemonService.addPokemon(pokemon);
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
function mapTypes() {
  try {
    if(typePokemon.value.length <= 2 && typePokemon.value.length > 0) {
      pokemon.types = [...typePokemon.value];
    }
    else {
      error.value.type = true;
    }
  }catch (e) {
    error.value.type = true;
  }
}

</script>

<template>
  <form @submit.prevent="submitPokemon">
    <div class="form-group row mb-3">
      <div class="col-md-12">
        <div class="mat-input-field">
          <input  v-model="pokemon.name" type="text" class="mat-text" id="name" required>
          <label class="mat-label" for="name">Pokémon name</label>
          <span v-if="error.name" class="error mt-1">La longueur du nom doit être supérieur à deux</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="mat-input-field">
          <input  v-model="pokemon.picture" type="text"
                  class="mat-text" id="picture" required>
          <label class="mat-label" for="picture">Picture</label>
          <span v-if="error.picture" class="error mt-1">Le format n'est pas correct</span>
        </div>
      </div>
    </div>

    <div class="form-group row mb-3">
      <div class="col-md-4">
        <label for="hp" class="form-label">HP</label>
        <input v-model.number="pokemon.hp" type="number" class="form-control" id="hp" required>
        <span v-if="error.hp" class="error mt-1">Le HP doit être plus grand que zero</span>
      </div>
      <div class="col-md-6">
        <label for="cp" class="form-label">CP</label>
        <input v-model.number="pokemon.cp" type="number" class="form-control" id="cp" required>
        <span v-if="error.cp" class="error mt-1">Le CP doit être plus grand que zero</span>
      </div>
    </div>

    <div class="form-group mb-3">
        <span v-for="(type,index) in PokemonService.typesPokemon()" :key="index">
          <input type="checkbox" v-model="typePokemon" :id="index" :name="type" :value="type">
          <label :for="index" class="p-1 mr-3 ml-2 rounded-circle p-1"
                 :style="{ backgroundColor: TypeColorHelper(type) }">{{type}}</label>
        </span>
      <div v-if="error.type" class="error mb-1">Minimum 1 type et maximum 2</div>
    </div>

    <button type="submit" class="btn btn-success">Submit</button>
    <router-link class="btn btn-dark ml-3" :to="`/pokemons`">retour</router-link>
  </form>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}
</style>