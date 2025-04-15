<script setup>
    const props = defineProps({
        note: Number,
    })
</script>
<template>
    <div class="stars">
        <div class="star" v-for="i in 5" :key="i">
                <i v-if="i <= props.note" class="fa-solid fa-star"></i>
                <i v-else-if="i > props.note && i < props.note + 1" class="fa-solid fa-star-half-stroke"></i>
                <i v-else class="fa-regular fa-star"></i>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .stars{
        @include position-contenus(flex, baseline, baseline);
        width: 100px;
        padding: 5px;
        i{
            color: $primary;
        }
    }
</style>