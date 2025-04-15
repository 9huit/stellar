<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { GetProducts } from "@/controllers/ProductController.js"
import Texte from '@/components/atoms/Texte.vue'
import Card from "@/components/organisms/Card.vue"
import Frame from "@/components/organisms/Frame.vue"
import Bouton from '@/components/atoms/Bouton.vue'
const user = JSON.parse(sessionStorage.getItem('user'))

const products = ref([]);
const search = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);
const form = ref(null);
const emit = defineEmits(['close']);
const id = ref(null);
const note = ref(null);
const minRating = ref(null) // par exemple, 3 ou 4

function mjeryid(id) {
  form.value = id;
}

async function enterNote(id ,options_note, note) {
  var finalnote = 0;
  if (Number(options_note) <= 0) {
    finalnote = Number(note);
  }
  else{
    finalnote = (Number(options_note) + Number(note)) / 2;
  }
  const API_URL = `http://localhost/dolibarr-21.0.0/htdocs/api/index.php/products/${id}`;
  const API_KEY = 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3';

  try {  
      const response = await axios.put(API_URL, {
        array_options: {
          options_note: finalnote
        }
      }, {
        headers: {
          'DOLAPIKEY': API_KEY,
          'Content-Type': 'application/json'
        }
      })
      return response.data
     
    } catch (error) {
      console.error('[SignupController] Erreur lors de l\'inscription :', error)
      throw error

    }
  }

onMounted(async () => {
  try {
    products.value = await GetProducts()
  } catch (e) {
    console.error('Erreur dans ProductList.vue :', e)
  }
})

const notes = async (id ,options_note, note) => {
    await enterNote(id ,options_note, note)
    form.value = null
};

const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });
}

// filtre
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch =
      !search.value ||
      product.label?.toLowerCase().includes(search.value.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.value.toLowerCase());

    const price = Number(product.price);
    const matchesMin = !minPrice.value || price >= Number(minPrice.value);
    const matchesMax = !maxPrice.value || price <= Number(maxPrice.value);

    const rating = Number(product.array_options.options_note || 0); // s'assurer que la note est un nombre
    const matchesRating = !minRating.value || rating >= Number(minRating.value);

    return matchesSearch && matchesMin && matchesMax && matchesRating;
  });
});

</script>

<template>
  <Frame>
    <div class="container">
      <div class="entete">
        <div class="welcome">
          <Texte type="black-light" :texte="'Bienvenu'" />
          <Texte v-if="user" type="black-light" :texte="user.name" />
        </div>
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
        <select v-model="minRating" id="minRating" name="minRating" class="minRating">
          <option :value="null">Notes</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }} notes et plus</option>
        </select>

        </div>
      </div>
      <!-- +Number(product.price * (1 + product.tva_tx/100))+'$ TTC)' -->
      <div class="produits">
        <div class="cards" v-for="product in filteredProducts" :key="product.id">
          <div class="validation">
          <Bouton type="secondary" texte="noter" @click="mjeryid(product.id)"/>
          <div class="note"  v-if="form === product.id && form !== null">
            <form action="" @submit.prevent="notes(product.id, product.array_options.options_note, note)">
              <input type="number" :min="1" :max="5" v-model="note">
              <input type="submit" value="noter"/>
            </form>
          </div>
        </div>
        <Card        
          :id="product.id"
          :title="product.label"
          :description="product.description"
          :note="Number(product.array_options.options_note)"
          :formattedPrice="formatPrice(Number(product.price))  + '$ HT '"
          :price="Number(product.price)"
        />
      </div>   
      </div>
      
    </div>
  </Frame>
</template>

<style scoped lang="scss">
    i{
    position: absolute;
    top: 100px;
    left: 0px;
    color: $primary;
    z-index: 9999;
  }
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
.welcome {
  @include position-contenus(flex, baseline, center);
  gap: 8px;
  width: 100%;
}
.validation{
  position: absolute;
  margin: 285px 190px;
  z-index: 9999;
}
.minRating{
    @include bouton-variant($primary, $primary, $radius-pm, $stara);
    width: 200px;
}
</style>
