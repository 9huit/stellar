<script setup>
import Texte from './Texte.vue';
defineProps({
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
    value: {
        type: String,
        default: ''
    }
});
</script>
<template>
    <div class="label">
      <Texte :type="'light'" :texte="label"/>
    </div>
    <input v-bind:type="type" v-bind:placeholder="placeholder" v-bind:value="value" v-bind:name="name" />
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