<script setup>
import NavLi from '../molecules/NavLi.vue'
import Bouton from '../atoms/Bouton.vue'
import Logo from '../atoms/Logo.vue';
defineProps({
  link: {
    type: Array,
    default: () => [
      { texte: 'Accueil', lien: '/' },
      { texte: 'À propos', lien: '/about' },
      { texte: 'Contact', lien: '/contact' },
    ],
  },
});
</script>
<template>
<header>
    <div class="header">
        <div class="header-logo">
            <Logo :type="'dark'"/>
        </div>
        <nav class="header-nav">
            <NavLi :link="link"/>
            <Bouton :type="'secondary'" :texte="'Se connecter'"/>
        </nav>
    </div>
</header>
</template>
<style lang="scss" scoped>
.header{
  z-index: 9998;
    position: fixed;
    @include position-contenus(flex, space-between, center);
    width: 100%;
    height: 64px;
    padding: 8px 64px;
    background: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(5px);
}
.header-nav{
    @include position-contenus(flex, center, center);
    gap: 24px;
}
</style>