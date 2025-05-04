<script setup>
import { computed, useAttrs } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['msg'])
const attrs = useAttrs()

const computedClass = computed(() => {
  return props.className
})

function sendMessage(event) {
  emit('msg', event)
}

</script>


<template>
  <button @click="sendMessage" :class="computedClass" v-bind="attrs">
    <slot></slot>
  </button>
</template>
