<script setup>
import Texte from '@/components/atoms/Texte.vue'
defineProps({
    link: Array,
});
</script>
<template>
    <div>
        <ul class="nav-ul">
            <li v-for="(item) in link" class="nav-li">
                <RouterLink :to="item.lien" class="nav-a">
                    <Texte :type="'light'" :texte="item.texte"/>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>  
    .nav-ul{
        @include position-contenus(flex, center, center);
    }
    li{
        list-style: none;
        margin-left: 24px;
    }
    a{
        text-decoration: none;
    }
</style>