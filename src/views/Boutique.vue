<script setup>
import { onMounted, ref, computed } from 'vue'
import { GetProducts } from "@/controllers/ProductController.js"
import Texte from '@/components/atoms/Texte.vue'
import Card from "@/components/organisms/Card.vue"
import Frame from "@/components/organisms/Frame.vue"
import Input from '@/components/atoms/Input.vue'

const products = ref([])
const search = ref('')
const minPrice = ref(null)
const maxPrice = ref(null)

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

// Liste filtrée avec plusieurs critères
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch =
      !search.value ||
      product.label?.toLowerCase().includes(search.value.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.value.toLowerCase())

    const price = Number(product.price)

    const matchesMin = !minPrice.value || price >= Number(minPrice.value)
    const matchesMax = !maxPrice.value || price <= Number(maxPrice.value)

    return matchesSearch && matchesMin && matchesMax
  })
})
</script>

<template>
  <Frame>
    <div class="container">
      <div class="entete">
        <Texte type="black-light" texte="Bienvenus" />
        <Texte type="light" texte="Nous avons pour vous toutes sortes de produits !" />
        <div class="filter">
        <input
          type="text"
          v-model="search"
          placeholder="Rechercher un produit..."
          class="search-input"
        />
        <input
            type="number"
            v-model="minPrice"
            placeholder="Prix min"
            class="price-input"
        />
        <input
            type="number"
            v-model="maxPrice"
            placeholder="Prix max"
            class="price-input"
        />
        </div>
      </div>

      <div class="produits">
        <Card
          v-for="product in filteredProducts"
          :key="product.id"
          :title="product.label"
          :description="product.description"
          :price="formatPrice(Number(product.price)) + ' AR'"
        />
      </div>
    </div>
  </Frame>
</template>

<style scoped lang="scss">
.container {
  @include position-contenus(flex, baseline, baseline);
  padding: 100px;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
}

.entete {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 12px;

  .search-input {
    @include bouton-variant($primary, $light, $radius-pm, $stara);
    width: 300px;
    
  }
  .price-input {
    @include bouton-variant($primary, $light, $radius-pm, $stara);
    width: 150px;
    
  }
}
.filter{
    display: flex;
    gap: 12px;
    margin-top: 16px;
}
.produits {
  @include position-contenus(flex, baseline, center);
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
}
</style>
