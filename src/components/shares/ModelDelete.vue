<script setup>

import {useI18n} from "vue-i18n";
import PokemonService from "../../service/PokemonService.js";

const { t } = useI18n();

  const props = defineProps({
    id: String
  })

function deletePokemon() {
    try {
        PokemonService.deletePokemonById(props.id);
        window.alert("Le pokémon a été supprimé avec succés");
        location.reload();
    }
    catch (e) {
      window.alert("Une erreur est survenue");
    }
  }

</script>

<template>
  <!-- data-target doit pointer sur un id unique -->
  <button type="button" class="btn btn-dark" :data-toggle="'modal'" :data-target="'#exampleModal-' + props.id">
    {{t("delete")}}
  </button>

  <!-- Modal -->
  <div class="modal fade" :id="'exampleModal-' + props.id" tabindex="-1" role="dialog" :aria-labelledby="'exampleModalLabel-' + props.id" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'exampleModalLabel-' + props.id">{{t("delete_pokemon")}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{t("sure_delete")}} {{props.id}} ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-dismiss="modal">{{t("back")}}</button>
          <button @click="deletePokemon()" type="button" class="btn btn-dark">{{t("delete")}}</button>
        </div>
      </div>
    </div>
  </div>
</template>