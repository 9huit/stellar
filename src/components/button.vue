<script setup>
</script>

<template>
    <button>Bonjour</button>
</template>

<style lang="scss" scoped>
    .button{
    @include bouton($primary, $secondary, $radius-pm, $stara);
    transition: all 0.5s ease-in-out;
    }
    .button:hover{
    font-weight: 700;
    }
</style>
