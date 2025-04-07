<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import { getFacture } from '@/controllers/FactureController.js';
import { Bar, Pie } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  Title, Tooltip, Legend, 
  BarElement, CategoryScale, LinearScale, ArcElement,
  Colors
} from 'chart.js';

// Enregistrement des composants ChartJS nécessaires
ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  ArcElement // pour le pie chart
);

const Facture = ref([]);
const selectedYear = ref(new Date().getFullYear());
const isLoading = ref(false);

// Simulation si API absente
// Facture.value = [
//   { id: 1, statut: "payé", total_ht: 1000, date: 1704067200 },
//   { id: 2, statut: "impayé", total_ht: 1500, date: 1706745600 },
//   { id: 3, statut: "payé", total_ht: 2000, date: 1711929600 },
//   { id: 4, statut: "impayé", total_ht: 3000, date: 1714521600 },
// ];

onMounted(async () => {
  try {
    isLoading.value = true;
    Facture.value = await getFacture();
  } catch (e) {
    console.error('Erreur lors du chargement des factures:', e);
  } finally {
    isLoading.value = false;
  }
});

const CA = computed(() => {
  return Facture.value.reduce((sum, facture) => sum + Number(facture.total_ht || 0), 0);
});

const total = computed(() => {
  return Facture.value.length;
});

const filteredInvoices = computed(() => {
  return Facture.value.filter(invoice => {
    const invoiceYear = new Date(invoice.date * 1000).getFullYear();
    return invoiceYear === selectedYear.value;
  });
});

const chartData = computed(() => {
  const invoices = filteredInvoices.value;
  const monthlyData = Array(12).fill(0);

  invoices.forEach(invoice => {
    const date = new Date(invoice.date * 1000);
    const month = date.getMonth();
    monthlyData[month] += Number(invoice.total_ht || 0);
  });

  return {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [{
      label: `CA ${selectedYear.value} (HT)`,
      backgroundColor: '#42b983',
      data: monthlyData,
    }]
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chiffre d\'affaires mensuel'
    }
  }
};

const pieOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Factures payées / impayées'
    }
  }
};

const pieData = computed(() => {
  const payees = Facture.value.filter(f => f.status === "2").length;
  const impayees = Facture.value.filter(f => f.status === "1").length;

  return {
    labels: ['Payées', 'Impayées'],
    datasets: [{
      label: 'Factures',
      data: [payees, impayees],
      backgroundColor: ['#4caf50', '#f44336'],
      borderWidth: 1
    }]
  };
});


const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 0 });
};
</script>
<template>
    <Frame>
      <div class="container">
        <!-- CA Total -->
        <div class="stat-card">
        <div class="chiffre">
            <Texte 
            type="black-primary" 
            :texte="`${formatPrice(CA)} €`" 
            />
            <Texte 
            type="light" 
            :texte="`Chiffres d'affaires Total`" 
            />
        </div>
        <div class="chiffre">
            <Texte 
            type="black-primary" 
            :texte="`${total}`" 
            />
            <Texte 
            type="light" 
            :texte="`Nombres de Factures`" 
            />
        </div>
        </div>
         
        <!-- Graphique BAR -->
        <div class="sec-graph">
        <div class="Bar-container">
            <div class="filters">
                <select v-model="selectedYear">
                    <option v-for="year in [2022, 2023, 2024, 2025]" :key="year" :value="year">{{ year }}</option>
                </select>
            </div> 
          <Bar  v-if="!isLoading" :data="chartData" :options="chartOptions" />
          <Texte v-else type="black-light" texte="Chargement..." />
        </div>
        <div class="Pie-container">
          <Pie  v-if="!isLoading" :data="pieData" :options="pieOptions" />
        </div>
        </div>
      </div>
    </Frame>
  </template>
  
  <style lang="scss" scoped>
  .container {
    @include position-contenus(flex, center, center);
    padding: 50px;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-shadow: 0px -227px 250px -2px #000 inset;
    background: url("@/assets/img/BG.jpg") lightgray 50% / cover no-repeat;
    gap: 20px;
    padding-bottom: 40px;
  }
  
  .Bar-container {
    @include position-contenus(flex, center, center);
    width: 50%;
    height: 50%;
    background: rgba(255, 255, 255, 0.8);
    padding: 50px;
    border-radius: 8px;
  }
  .Pie-container {
    @include position-contenus(flex, center, center);
    width: auto;
    height: 50%;
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 8px;
  }
  
  .filters {
    position:absolute;
    top: 150px;
    left: 420px;
    margin: 10px;
    width: 30px;
    select {
      padding: 8px;
      border-radius: 4px;
      background-color: #e1e1e1;
      border: 1px solid #ccc;
    }
  }
  .chiffre{
    @include position-contenus(flex, center, center);
    flex-direction: column;
    padding: 9px 85px;
    
    border-radius: $radius-pm 0px;
    background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(5px);
  }
  .sec-graph{
    @include position-contenus(flex, space-between, center);
    gap: 20px;
    width: 100%;
    height: 30%;
    padding: 0px 128px;
    border-radius: 8px;
  }
  .stat-card{
    @include position-contenus(flex, space-between, center);
    gap: 20px;
    width: 100%;
    height: 30%;
    padding: 0px 128px;
    border-radius: 8px;
  }
  </style>
  