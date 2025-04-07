<script setup>
  import { defineProps } from 'vue'
  import Texte from '@/components/atoms/Texte.vue'
  import Bouton from '@/components/atoms/Bouton.vue'
  const props = defineProps({
    id: Number,
    title: String,
    description: String,
    price: Number,
    formattedPrice: String
  })
  
  const ajouterAuPanier = () => {
    const produit = {
      id: props.id,
      title: props.title,
      description: props.description,
      price: props.price,
      quantite: 1 // Quantité initiale
    }
  
    // Récupérer le panier depuis localStorage ou créer un tableau vide
    let panier = JSON.parse(localStorage.getItem('panier')) || []
  
    // Vérifier si le produit existe déjà dans le panier
    const index = panier.findIndex(p => p.id === produit.id)
  
    if (index === -1) {
      // Produit non présent, on l'ajoute
      panier.push(produit)
    } else {
      // Produit déjà présent, on incrémente la quantité
      panier[index].quantite += 1
    }
  
    // Enregistrer le panier mis à jour dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier))
    alert('Produit ajouté au panier !')
  }
  </script>
<template>
    <div class="card"> 
      <img src="../../assets/img/sx.png" alt="">
      <div class="info">
        <Texte type="bold-light" :texte="title" />
        <Texte type="grey" :texte="description" />
        <Texte type="black-primary" :texte="price" />
        <Bouton type="primary" texte="Ajouter au panier" @click="ajouterAuPanier" />
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
        box-shadow: 0px -150px 150.2px -26px rgba(0, 0, 0, 0.75) inset;  
        transition: all 0.3s ease-in-out;
    }
    .card:hover{
        box-shadow: 0px -150px 50.2px -26px rgba(0, 0, 0, 0.75) inset;
        background-color: rgb(126, 126, 130);  
        img{
        filter: blur(0.3px);
    }
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: $radius-gm 0px;
        object-fit: cover;
        object-position: right top;
        transition: all 0.3s ease-in-out;
        
    }
    .info{
        position:relative;
        margin: 0px -282px 20px;
    }
    
</style>