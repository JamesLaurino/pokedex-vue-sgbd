<script setup>


import {ref} from "vue";
import UserService from "../service/UserService.js";
import {useRouter} from "vue-router";


const user = ref(null);
const userInput = ref({
  id:'',
  name: '',
  password: "",
})

const isConnected = ref(false)
const router = useRouter();

function connexion() {

  UserService.searchUserByEmail(userInput.value.name)
      .then(data => {

        user.value = data;
        isConnected.value = UserService.isConnected(userInput.value, user.value[0])

        if(isConnected.value === true) {
          window.alert("Connection effectuée avec success !")
          router.push({ path: '/pokemons'});
        }
        else {
          window.alert("Une erreur est survenue lors de la connexion");
          router.push({ path: '/login'});
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
            <label class="mat-label" for="name">Username</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mat-input-field">
            <input type="password" v-model="userInput.password" class="mat-text" id="password" required>
            <label class="mat-label" for="password">Password</label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-dark">Login</button>
    </form>
  </div>
</template>