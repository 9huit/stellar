<script setup>
import { onMounted, ref } from 'vue'
import { getFacture } from '@/controllers/FactureController';
import Frame from '@/components/organisms/Frame.vue';
import Login from './Login.vue';
import Texte from '@/components/atoms/Texte.vue';
import { GetOrdersById } from '@/controllers/CommandeController.js';
import FactureVue from '@/components/pages/FactureVue.vue';
const user = JSON.parse(sessionStorage.getItem('user'))
const orders = ref([]);
const lines = ref([]);
defineProps({
  statut: {
    type: Array,
    default: () => [
      { id: '1', statut: 'Commande effectuée' },
      { id: '2', statut: 'Facture créée' },
      { id: '3', statut: 'Paiement effectuée' },
    ],
  },
  URLdlbr: {
    type: String,
    default: 'http://localhost/dolibarr-21.0.0/htdocs',
  },
  entity: {
    type: String,
    default: '1',
  },
});
function mjeryid(id) {
  form.value = id;
}
const form = ref(null);
const Facture = ref([]);
const popup = ref(false);


onMounted(async () => {
  try {
    orders.value = await GetOrdersById(user.id)
    Facture.value = await getFacture()
  } catch (e) {
    console.error('Erreur dans ProductList.vue :', e)
  }
})
const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });
}
</script>
<template>
    <Frame>
      <div class="container">
        <Login v-if="!user"/>
        <div v-else>    
          <div class="scroll-content" v-if="orders.length > 0">
            <div v-for="order in orders" :key="order.id" class="scroll-item">
                    
                    <Texte type="black-light" :texte="order.ref"/>
              <div v-for="line in order.lines" :key="line.id" class="description-item">
                        <Texte type="bold-light" :texte="line.libelle"/>
                        <Texte type="light" :texte="line.description || 'Pas de description'"/>
                        <Texte type="light" :texte="`Prix unitaire: ${formatPrice(Number(line.subprice)) || 0} AR`"/>
                        <Texte type="light" :texte="`Quantité: ${line.qty}`"/>
                        <Texte type="light" :texte="`prix total: ${formatPrice(Number(line.total_ht)) || 0} AR`"/>
              </div> 
              <Texte type="bold-light" :texte="`Total HT: ${formatPrice(Number(order.multicurrency_total_ht)) || 0} AR`"/>
                    <!-- facture -->
              <div class="statut">
                <div class="pdf" v-for="facture in Facture" :key="facture.id">
                  <div class="pdf" v-if="facture.note_public.includes(order.ref)">
                    <FactureVue :reference="order" :facture="facture" v-if="form === facture.id && form !== null"/>
                      <Texte type="primary" :texte="statut[1].statut"   @click="mjeryid(facture.id)"/>
                      <a :href="URLdlbr+'/document.php?modulepart=facture&entity=1&file='+facture.ref+'%2F'+facture.ref+'.pdf'" target="_blank"><i class="fas fa-file-pdf"></i></a>
                  </div>
                  <div class="pdf" v-if="facture.note_public.includes(order.ref) && facture.statut == '2'">
                      <Texte type="primary" :texte="statut[2].statut"/>
                      <i class="fas fa-money-check"></i>
                  </div>
                </div>
                <div class="pdf" v-if="order.statut == '1'">
                    <Texte type="primary" :texte="statut[0].statut"/>
                    <i class="fa-solid fa-check"></i>
                  </div>
              </div>
            </div>
          </div>
          <Texte type="light" :texte="'Aucune commande !'" v-if="orders.length < 1"/>
        </div>
      </div> 
    </Frame>
</template>
<style lang="scss" scoped>
  .description-item{
    @include position-contenus(flex, center, center);
    gap: 24px;
  }
  .scroll-content{
    @include position-contenus(flex, baseline, baseline);
    flex-direction: column;
    gap: 24px;
  }
  i{
    color: $primary;
  }
  .pdf{
    @include position-contenus(flex, baseline, baseline);
    gap: 10px;
  }
  .statut{
    @include position-contenus(flex, baseline, baseline);
    width:500px;
  }
</style>