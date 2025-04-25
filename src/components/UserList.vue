<script setup>

defineProps({
    users: {
      type:Array,
      required:true
    }
})
</script>

<template>
  <div class="container d-flex justify-content-center mt-5 mb-5">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">id</th>
        <th scope="col">Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{user.id}}</th>
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
