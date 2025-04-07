<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import { GetProductById } from "@/controllers/ProductController.js"

const route = useRoute();
const productId = route.params.id; // Récupère l'ID du produit depuis l'URL

const product = ref(null);  // Pour stocker un seul produit

onMounted(async () => {
  try {
    // Récupérer un produit avec l'ID
    const response = await GetProductById(productId);
    product.value = Array.isArray(response) ? response[0] : response;  // Si réponse est un tableau, on prend le premier produit
  } catch (e) {
    console.error('Erreur dans ProductDetail.vue :', e);
  }
})
</script>

<template>
    <Frame>
      <div v-if="product" :key="product.id">
        <Texte type="bold-light" :texte="product.label"/>
        <Texte type="light" :texte="product.description || 'Pas de description'"/>
      </div>
      <div v-else>
        <Texte type="error" :texte="'produit indisponible'"/>
      </div>
    </Frame>
  </template>
