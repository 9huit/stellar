<script setup>
import NavLi from '../molecules/NavLi.vue'
import Bouton from '../atoms/Bouton.vue'
import Logo from '../atoms/Logo.vue';
import Login from '@/views/Login.vue';
import { logoutUser } from '@/controllers/UserController';
import { ref } from 'vue';

const user = JSON.parse(sessionStorage.getItem('user'))

const showLogin = ref(false);
const handleSubmit = () => {
  logoutUser()
}
defineProps({
  link: {
    type: Array,
    default: () => [
      { texte: 'Accueil', lien: '/' },
      { texte: 'Boutique', lien: '/Boutique' },
      { texte: 'Panier', lien: '/Panier' },
      { texte: 'Mes commandes', lien: '/MesCommandes' },
      // { texte: 'Contact', lien: '/contact' },
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
            <!-- <RouterLink :to="'/Login'"> -->
              <Bouton :type="'secondary'" :texte="'Se connecter'" @click="showLogin = true" v-if="!user"/>
                <Bouton :type="'secondary'" :texte="'Se deconnecter'"  v-else @click="handleSubmit"/>
            <!-- </RouterLink> -->
        </nav>
    </div>
    <div class="login">
                <Login  v-show="showLogin" @close="showLogin = false"/>
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