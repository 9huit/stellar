<script setup>
defineProps({
  type: String,
  texte : String,
  redirection : String,
});
</script>
<template>
    <button v-bind:class="`button-${type}`">{{ texte }}</button>
  </template>
  <style lang="scss" scoped>

  .button-primary {
    cursor: pointer;
      @include bouton($primary, $dark, $radius-pm, $stara);
      transition: all 0.5s ease-in-out;
  }


  .button-secondary {
    cursor: pointer;
    @include bouton-variant($primary, $light, $radius-pm, $stara);
    transition: all 0.5s ease-in-out;
  }
  .button-secondary:hover {
    @include bouton($primary, $secondary, $radius-pm, $stara);
  }
  </style>
  