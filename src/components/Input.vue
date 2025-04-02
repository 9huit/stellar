<script setup>
defineProps({
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
    <input v-bind:type="type" v-bind:placeholder="placeholder" v-bind:value="value" />
</template>
<style lang="scss" scoped>

input{
    @include bouton-variant($primary, $light, $radius-pm, $stara);
    width: 250px;
    .input::placeholder{
        color: $gris;
    }
}

</style>