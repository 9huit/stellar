<script setup>
defineProps({
  texte: String,
  type: String,
});
</script>
<template>
    <p v-bind:class="`text-${type}`">{{ texte }}</p>
</template>
<style lang="scss" scoped>
.text-dark{
    @include text-pm($stara, $secondary);
}
.text-grey{
    @include text-pm($stara, $gris);
}
.text-primary{
    @include text-pm($stara, $primary);
}
.text-light{
    @include text-pm($stara, $light);
}

.text-black-dark{
    @include text-xl($stara, $secondary);
}
.text-black-grey{
    @include text-xl($stara, $gris);
}
.text-black-primary{
    @include text-xl($stara, $primary);
}
.text-black-light{
    @include text-xl($stara, $light);
}

.text-bold-dark{
    @include text-gm($stara, $secondary);
}
.text-bold-grey{
    @include text-gm($stara, $gris);
}
.text-bold-primary{
    @include text-gm($stara, $primary);
}
.text-bold-light{
    @include text-gm($stara, $light);
}

</style>