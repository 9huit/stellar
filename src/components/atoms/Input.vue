<script setup>
import { defineProps, defineEmits } from 'vue';
import Texte from './Texte.vue';

const emit = defineEmits();
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {  // Changement de 'value' à 'modelValue'
    type: String,
    default: ''
  }
});

// Quand la valeur de l'input change, émettre l'événement 'update:modelValue'
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="label">
    <Texte :type="'light'" :texte="label"/>
  </div>
  <input
    v-bind:type="type"
    v-bind:placeholder="placeholder"
    v-bind:name="name"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style lang="scss" scoped>

input{
    @include bouton-variant($primary, $light, $radius-pm, $stara);
    width: 250px;
    .input::placeholder{
        color: $gris;
    }
}
.label{
  padding-left:30px;
}
</style>