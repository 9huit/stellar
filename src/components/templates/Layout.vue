<script setup>
import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
</script>
<template>
    <Header/>
    <slot/>
    <Footer/>
</template>
<style scoped lang="scss">
</style>