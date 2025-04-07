<script setup>
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import Bouton from '@/components/atoms/Bouton.vue';
import Login from './Login.vue';
import { creerCommandeAvecLignes, createOrderFromLocalStorage } from '@/controllers/CommandeController.js'
const user = JSON.parse(sessionStorage.getItem('user'))
import { ref, onMounted } from 'vue'
const panier = ref([])
const total = ref(0)

   const viderPanier = () => {
  panier.value = []
  localStorage.setItem('panier', JSON.stringify(panier.value))
  calculerTotal()
}
 const chargerPanier = () => {
  const panierStorage = JSON.parse(localStorage.getItem('panier')) || []
  panier.value = panierStorage
  calculerTotal()
}

 const calculerTotal = () => {
  total.value = panier.value.reduce((acc, p) => acc + p.price * p.quantite, 0)
  console.log(total.value)

}

 const supprimerProduit = (id) => {
  panier.value = panier.value.filter(p => p.id !== id)
  localStorage.setItem('panier', JSON.stringify(panier.value))
  calculerTotal()
}

const ajouterProduit = (id) => {
  const produit = panier.value.find(p => p.id === id)
  if (produit) {
    produit.quantite++
    localStorage.setItem('panier', JSON.stringify(panier.value))
    calculerTotal()
  }
}

const diminuerProduit = (id) => {
  const produit = panier.value.find(p => p.id === id)
  if (produit && produit.quantite > 1) {
    produit.quantite--
    localStorage.setItem('panier', JSON.stringify(panier.value))
    calculerTotal()
  }
}
const usr = ref(true)

const commander = async () => {
    if (!user) {
      usr.value = false
    }
    if (user) {
      await createOrderFromLocalStorage(panier.value);
      viderPanier();
    }
};
onMounted(() => {
  chargerPanier()
})
</script>
<template>
    <Frame>
      <Login v-show="usr == false"/>
        <div class="container">
        <Bouton type="primary" texte="Vider le panier" @click="viderPanier"/>
        <Texte type="bold-light" :texte="'Votre panier est vide ! ' + total" v-if="panier.length<1"/>
        <div class="panier" v-else v-for="produit in panier" :key="produit.id">
            <Texte type="bold-light" :texte="produit.title" />
            <Texte type="light" :texte="produit.description" />
            <Texte type="light" :texte="produit.price" />
            <Bouton type="secondary" texte="Supprimer" @click="supprimerProduit(produit.id)" />
            <div class="btn">
                <Bouton type="primary" texte="-" @click="diminuerProduit(produit.id)" />
                <Bouton type="secondary" :texte="produit.quantite" />
                <Bouton type="primary" texte="+" @click="ajouterProduit(produit.id)" />
            </div>
        </div>
        <Texte type="black-primary" :texte="'Total :'+total"/>
        <Bouton type="primary" texte="Commander" @click="commander"/>
    </div>
    </Frame>
</template>
<style lang="scss" scoped>
.panier{
    @include position-contenus(flex, center, center);
    flex-direction: column;
    gap: 24px;
}
.container{
    @include position-contenus(flex, baseline, flex-start);
    padding: 100px;
    flex-direction: column;
    gap: 24px;
}
</style>