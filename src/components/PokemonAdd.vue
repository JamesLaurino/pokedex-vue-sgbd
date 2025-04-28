<script setup>

import {ref} from "vue";
import PokemonService from "../service/PokemonService.js";
import TypeColorHelper from "../helpers/TypeColorHelper.js";
import {useRouter} from "vue-router";


const pokemon = ref({
  name: '',
  hp: 0,
  cp: 0,
  picture: '',
  types: []
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

const typePokemon = ref([])

function addPokemon() {
    try
    {
        mapTypes()
        checkName();
        checkPicture();
        checkCP();
        checkHP();

        const hasError = Object.values(error.value).some(val => val === true);
        if(!hasError) {
          PokemonService.addPokemon(pokemon.value);
          window.alert("Pokémon ajouté avec succés");
          router.push({ path: '/pokemons'});
        }
    }
      catch (e) {
        window.alert("Une erreur est survenue");
      }
}
function checkName() {
  if(pokemon.value.name.length <= 2) {
    error.value.name = true;
  }
}
function checkHP() {
  if(pokemon.value.hp <= 0) {
    error.value.hp = true;
  }
}
function checkCP() {
  if(pokemon.value.cp <= 0) {
    error.value.cp = true;
  }
}
function checkPicture() {
  if(!urlPattern.test(pokemon.value.picture)) {
    error.value.picture = true;
  }
}
function mapTypes() {
  try {
    if(typePokemon.value.length <= 2 && typePokemon.value.length > 0) {
      typePokemon.value.forEach((e) => {
        pokemon.value.types.push(e)
      });
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
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="addPokemon">
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
                    placeholder="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png"
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
      </div>

      <button type="submit" class="btn btn-success">Ajouter</button>
      <router-link class="btn btn-dark ml-3" :to="`/pokemons`">retour</router-link>
    </form>
  </div>
</template>

<style>

.error {
  color: red;
  font-size: 0.9em;
}
.mat-label {
  font-family: "system-ui", "Courier New", monospace;
}
.mat-input-field {
  position: relative;
  margin-top: 20px;
}
.mat-input-field .mat-text {
  border: none;
  border-bottom: 2px solid #9e9e9e;
  outline: none;
  font-size: 25px;
  padding: 5px 0;
  width: 100%;
  transition: border-color 0.3s;
}
.mat-input-field .mat-label {
  position: absolute;
  top: -8px;
  left: 0;
  font-size: 16px;
  color: #9e9e9e;
  transition: all 0.3s;
  pointer-events: none;
}
.mat-input-field input:focus {
  border-bottom: 2px solid #26a69a;
}
.mat-input-field input:focus + .mat-label,
.mat-input-field input:valid + .mat-label {
  top: -15px;
  font-size: 12px;
  color: #26a69a;
}
input::placeholder {
  font: 1rem/3 sans-serif;
}
</style>