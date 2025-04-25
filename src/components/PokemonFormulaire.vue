<script setup>

import {ref} from "vue";

const pokemon = ref({
  name: '',
  hp: 0,
  cp: 0,
  picture: '',
  types: []
})

const types = ref('')

function addPokemon() {
  console.log(pokemon.value.name)
  console.log(pokemon.value.hp)
  console.log(pokemon.value.cp)
  console.log(pokemon.value.picture)
  console.log(types.value)
}

</script>

<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="addPokemon">
      <div class="form-group row mb-3">
        <div class="col-md-6">
          <div class="mat-input-field">
            <input  v-model="pokemon.name" type="text" class="mat-text" id="name" required>
            <label class="mat-label" for="name">Pokémon name</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mat-input-field">
            <input  v-model="pokemon.picture" type="text" class="mat-text" id="picture" required>
            <label class="mat-label" for="picture">Picture</label>
          </div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <div class="col-md-6">
          <label for="hp" class="form-label">HP</label>
          <input v-model.number="pokemon.hp" type="number" class="form-control" id="hp" required>
        </div>
        <div class="col-md-6">
          <label for="cp" class="form-label">CP</label>
          <input v-model.number="pokemon.cp" type="number" class="form-control" id="cp" required>
        </div>
      </div>

      <div class="form-group mb-3">
        <div class="mat-input-field">
          <input  v-model="types"  type="text" class="mat-text" id="types" required>
          <label class="mat-label" for="types">Types (séparés par une virgule)</label>
        </div>
      </div>

      <button type="submit" class="btn btn-success">Ajouter</button>
    </form>
  </div>
</template>

<style>

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
  top: 5px;
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
</style>