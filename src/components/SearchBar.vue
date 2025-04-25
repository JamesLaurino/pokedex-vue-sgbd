<script setup>

</script>

<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-3 text-center">
        <div class="mat-input-field">
          <input type="text" class="mat-text" id="name" required>
          <label class="mat-label" for="name">Pokémon</label>
        </div>
      </div>
    </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-1 text-left">
        <div>
          <button class="btn btn-dark">submit</button>
        </div>
      </div>
    </div>
</template>

<style>
.mat-label {
  font-family: "Lucida Console", "Courier New", monospace;
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