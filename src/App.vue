<script setup>
import Input from './components/Input.vue';
import Bouton from './components/Bouton.vue';
</script>

<template>
  <Input :type="'datetime-local'" :placeholder="'Entrez votre nom'"/>
  <br>
  <Bouton :texte="'Clique ici'" :type="'primary'"/>
</template>

<style scoped>
</style>
