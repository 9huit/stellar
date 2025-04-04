<script setup>
import { onMounted, ref } from 'vue'
import { GetProducts } from "@/controllers/ProductController.js"
import Frame from "../organisms/Frame.vue"
import Card from "../organisms/Card.vue"
import Texte from "../atoms/Texte.vue"

const products = ref([])

onMounted(async () => {
  try {
    products.value = await GetProducts()
  } catch (e) {
    console.error('Erreur dans ProductList.vue :', e)
  }
})
const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 5,
  });
}
</script>

<template>
  <Frame id="frm">
    <div class="scroll-container">
        <div class="entete">
                <Texte type="bold-light" texte="Autres articles"/>
                <Texte type="light" texte="similaires"/>
                <Texte type="light" texte="Toujours plus rapide, plus robuste ! Ces modèles de ma meme marque sont faits pour dominer tous les terrains !"/>
        </div>

    <div class="scroll-content">
      <div
          v-for="product in products"
          :key="product.id"
          class="scroll-item"
        >
          <Card
            :id="product.id"
            :title="product.label"
            :description="product.description || 'Pas de description'"
            :price="`${formatPrice(Number(product.price)) || 0} AR`"
          />
        </div>
    </div>
  </div>
  </Frame>
</template>

<style lang="scss" scoped>
.scroll-container {
    @include position-contenus(flex, baseline, flex-start);
    flex-direction: column;
  gap: 24px;
  padding: 64px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none; /* Cacher la scrollbar sur Firefox */
  -ms-overflow-style: none; /* Cacher la scrollbar sur Edge */

  width: 1366px;
    flex-shrink: 0;
}
.entete{
    position: absolute;
    @include scrollable;
    margin: -100px 0px ;
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Cacher la scrollbar sur Chrome et Safari */
}

.scroll-content {
  display: flex;
  gap: 68px;
  box-shadow: 50px 75px 350px 0px rgba(0, 0, 0, 0.9) inset;

}

.scroll-item {
  @include position-contenus(flex, center, center);
  color: $secondary;
  border-radius: $radius-gm, 0px;
  flex-shrink: 0; /* Empêche les éléments de rétrécir */
}
</style>
