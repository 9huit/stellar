<script setup>
import Texte from '../atoms/Texte.vue';
import Bouton from '../atoms/Bouton.vue';

const props = defineProps({
    id: Number,
//   image: String,
  title: String,
  description: String,
  price: Number
})
</script>
<template>
    <div class="card">
        <img src="../../assets/img/sx.png" alt="">
        <div class="info">
            <Texte type="bold-light" :texte="title"/>
            <Texte type="grey" :texte="description"/>
            <Texte type="black-primary" :texte="price"/>
            <RouterLink :to="'/ProductDetail/'+id">
                <Bouton type="primary" texte="Acheter"/>
            </RouterLink>
        </div>

    </div>
</template>
<style lang="scss" scoped>
    .card{
        @include position-contenus(flex, baseline, flex-end);
        width: 298px;
        height: 345px;
        border-radius: $radius-gm 0px;
        background: rgba(28, 34, 44, 0.05);
        background-color: $secondary;
        box-shadow: 0px -109px 101.2px -26px rgba(0, 0, 0, 0.75) inset;  
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: $radius-gm 0px;
        object-fit: cover;
        object-position: right top;
    }
    .info{
        position:relative;
        margin: 0px -282px 10px;
    }
    
</style>