<script setup>
</script>

<template>
    <div class="frame">
        <slot/>
    </div>
</template>

<style scoped lang="scss">
.frame {
  @include position-contenus(flex, center, center);
  width: 100%;
  min-height: 768px;
}
</style>
