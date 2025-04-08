<script setup>
import { onMounted, ref, computed } from 'vue'
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import { getFacture } from '@/controllers/FactureController.js';
import { GetProducts } from '@/controllers/ProductController';
import { Bar, Pie, Line } from 'vue-chartjs';
import { 
  Chart as ChartJS,LineElement,PointElement,
  Title, Tooltip, Legend, 
  BarElement, CategoryScale, LinearScale, ArcElement,
  Colors
} from 'chart.js';
import Input from '@/components/atoms/Input.vue';



// Enregistrement des composants ChartJS nécessaires
ChartJS.register(
  Title, Tooltip, Legend, LineElement,PointElement,
  BarElement, CategoryScale, LinearScale,
  ArcElement // pour le pie chart
);

const Facture = ref([]);
const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(null);
const selectedProduct = ref(null);
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
    Facture.value = await getFacture();
    SelectedProduct.value = await GetProducts();
    isLoading.value = true;
  } catch (e) {
    console.error('Erreur lors du chargement des factures:', e);
  } finally {
    isLoading.value = false;
  }
});

const produitsDispo = computed(() => {
  const produits = new Set();
  Facture.value.forEach(facture => {
    facture.lines.forEach(line => {
      produits.add(line.product_label);
    });
  });
  return Array.from(produits);
});


const Total = computed(() => {
    const invoices = filteredInvoices.value;
    return invoices.filter(facture => facture.status === '2').length;
});

const CA = computed(() => {
    const invoices = filteredInvoices.value;
    const totalVentes = invoices.reduce((sum, inv) => sum + Number(inv.total_ht), 0);
    return totalVentes;
});

// FILTRE BE TSY MVAVAKA
const filteredInvoices = computed(() => {
  return Facture.value.filter(invoice => {
    const date = new Date(invoice.date * 1000);
    const yearMatch = date.getFullYear() === selectedYear.value;
    const monthMatch = selectedMonth.value === null || date.getMonth() === selectedMonth.value;

    const productMatch = selectedProduct.value === null || invoice.lines.some(line => {
      return line.product_label === selectedProduct.value;
    });

    return yearMatch && monthMatch && productMatch;
  });
});

const filteredDate = computed(() => {
  return Facture.value.filter(invoice => {
    const date = new Date(invoice.date * 1000);
    const yearMatch = date.getFullYear() === selectedYear.value;
    const monthMatch = selectedMonth.value === null || date.getMonth() === selectedMonth.value;
    return yearMatch && monthMatch;
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
      family: 'stara',
      backgroundColor: '#42b983',
      data: monthlyData,
      backgroundColor: [ // Couleurs des barres
        '#D5FE00',
        '#D5FE00',
        '#D5FE00',
        '#D5FE00',
        '#D5FE00',
        '#D5FE00'
      ],
    }]
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chiffre d\'affaires mensuel',
      color: '#F0EFF4', // Couleur du titre
      font: {
        size: 16,
        family: 'stara',
      }
    },
    legend: {
      labels: {
        color: '#F0EFF4' // Couleur de la légende
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#F0EFF4' // Couleur des ticks de l'axe X
      },
      grid: {
        color: '#373737' // Couleur de la grille X
      }
    },
    y: {
      ticks: {
        color: '#F0EFF4' // Couleur des ticks de l'axe Y
      },
      grid: {
        color: '#373737' // Couleur de la grille Y
      }
    }
  }
};

const pieOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Factures payées / impayées',
      color: '#F0EFF4', // Couleur du titre
      font: {
        size: 16,
        family: 'stara',
      }
    },
    legend: {
      labels: {
        color: '#F0EFF4' // Couleur de la légende
      }
    }
  }
};

const pieData = computed(() => {
  const invoices = filteredInvoices.value;
  const payees = invoices.filter(f => f.status === "2").length;
  const impayees = invoices.filter(f => f.status === "1").length;

  return {
    labels: ['Payées', 'Impayées'],
    datasets: [{
      label: 'Factures',
      family: 'stara',
      data: [payees, impayees],
      backgroundColor: ['#D5FE00', '#1C222C'],
      borderWidth: 1
    }]
  };
});

const factureParMoisData = computed(() => {
  const paidFactures = filteredInvoices.value.filter(f => f.status === "2");
  const monthlyCount = Array(12).fill(0);

  paidFactures.forEach(facture => {
    const date = new Date(facture.date * 1000);
    const month = date.getMonth(); // de 0 à 11
    monthlyCount[month]++;
  });

  return {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [{
      label: 'Ventes / mois',
      family: 'stara',
      data: monthlyCount,
      fill: false,
      borderColor: '#D5FE00',
      backgroundColor: '#D5FE00',
      tension: 0.5, // Pour une courbe lissée
      pointBackgroundColor: '#fff',
      pointBorderColor: '#D5FE00',
      pointRadius: 5
    }]
  };
});

const factureParMoisOptions = {
    responsive: true,
    plugins: {
        title: {
        display: true,
        text: 'Nombre de ventes par mois',
        color: '#F0EFF4', // Couleur du titre
        font: {
            size: 16,
            family: 'stara'
        }
        },
        legend: {
        color: '#F0EFF4'
        },
        labels: {
        color: '#F0EFF4'
        },
        scales: {
            x: {
            ticks: {
                color: '#F0EFF4' // Couleur des ticks de l'axe X
            },
            grid: {
                color: '#373737' // Couleur de la grille X
            }
            },
            y: {
            ticks: {
                color: '#F0EFF4' // Couleur des ticks de l'axe Y
            },
            grid: {
                color: '#373737' // Couleur de la grille Y
            }
            }
        }
    }
    };

const VenteParMoisData = computed(() => {
  
  const monthlyCount = Array(12).fill(0);

  filteredInvoices.value
    .filter(facture => facture.status === '2') // factures payées
    .forEach(facture => {
      const date = new Date(facture.date * 1000);
      const mois = date.getMonth();

      facture.lines.forEach(line => {
        monthlyCount[mois] += Number(line.qty);
      });
    });

  return {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [{
      label: 'Produits / mois',
      family: 'stara',
      data: monthlyCount,
      fill: false,
      borderColor: '#D5FE00',
      backgroundColor: '#D5FE00',
      tension: 0.5, // Pour une courbe lissée
      pointBackgroundColor: '#fff',
      pointBorderColor: '#D5FE00',
      pointRadius: 5
    }]
  };
});

const VenteParMoisOptions = {
    responsive: true,
    plugins: {
        title: {
        display: true,
        text: 'Nombre de produits vendus par mois',
        color: '#F0EFF4', // Couleur du titre
        font: {
            size: 16,
            family: 'stara'
        }
        },
        legend: {
        color: '#F0EFF4'
        },
        labels: {
        color: '#F0EFF4'
        },
        scales: {
            x: {
            ticks: {
                color: '#F0EFF4' // Couleur des ticks de l'axe X
            },
            grid: {
                color: '#373737' // Couleur de la grille X
            }
            },
            y: {
            ticks: {
                color: '#F0EFF4' // Couleur des ticks de l'axe Y
            },
            grid: {
                color: '#373737' // Couleur de la grille Y
            }
            }
        }
    }
    };


const productSales = computed(() => {
const sales = {};

filteredDate.value.forEach(facture => {
    if (facture.status !== '2') return; // On ne prend que les payées

    facture.lines.forEach(line => {
      const key = line.fk_product;
      if (!sales[key]) {
        sales[key] = {
          id: key,
          product_label: line.product_label,
          qty: 0,
        };
      }
      sales[key].qty += Number(line.qty);
    });
  });

  // Retourne les produits triés du plus vendu au moins vendu
  return Object.values(sales).sort((a, b) => b.qty - a.qty);
});
const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 0 });
};

const totalProduitsVendus = computed(() => {
  return filteredInvoices.value
    .filter(facture => facture.status === '2') // seulement les factures payées
    .reduce((total, facture) => {
      return total + facture.lines.reduce((sousTotal, line) => sousTotal + Number(line.qty), 0);
    }, 0);
});


const historiqueProduitsVendus = computed(() => {
  return Facture.value
    .filter(f => f.status === '2') // Factures payées
    .flatMap(f => f.lines.map(line => ({
      date: new Date(f.date * 1000),
      produit: line.product_label,
      quantite: line.qty,
      prix_unitaire: Number(line.subprice),
      total: parseInt(line.qty) * Number(line.subprice)
    })));
});

</script>
<template>
    <Frame>
        <div class="filters">
                <select v-model="selectedYear">
                    <option v-for="year in [2022, 2023, 2024, 2025]" :key="year" :value="year">{{ year }}</option>
                </select>
                <select v-model="selectedMonth">
                    <option :value="null">Tous les mois</option>
                    <option v-for="(month, index) in ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']" :key="index" :value="index">
                    {{ month }}
                    </option>
                </select>
                <select v-model="selectedProduct">
                    <option :value="null">Tous les produits</option>
                    <option v-for="p in produitsDispo" :key="p" :value="p">{{ p }}</option>
                </select>
        </div> 
      <div class="container">
        <!-- CA Total -->
         <div class="entete">
            <Texte type="black-primary" texte="DASHBOARD" />
            <Texte type="light" texte="Bienvenu(e) a vous." />
        </div>
        <div class="stat-card">
        <div class="chiffre">
            <Texte 
            v-if="!isLoading"
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
            :texte="`${totalProduitsVendus} produits vendus`" 
            />
            <Texte 
            type="light" 
            :texte="`Nombres de Produits Vendus`"
            />
        </div>
        <div class="chiffre">
            <Texte 
            type="black-primary" 
            :texte="`${Total} ventes`" 
            />
            <Texte 
            type="light" 
            :texte="`Nombres de ventes (Factures)`"
            />
        </div>
        </div>
         
        <!-- Graphique BAR -->
        <div class="sec-graph">
        <div class="Bar-container">
          <Bar  v-if="!isLoading" :data="chartData" :options="chartOptions" />
          <Texte v-else type="black-light" texte="Chargement..." />
        </div>
        <div class="Pie-container">
          <Pie  v-if="!isLoading" :data="pieData" :options="pieOptions" />
        </div>
        </div>
        <div class="sec-graph">
            <div class="Bar-container">
                <Line v-if="!isLoading" :data="factureParMoisData" :options="factureParMoisOptions" />
            </div>
            <div class="Bar-container">
                <Line v-if="!isLoading" :data="VenteParMoisData" :options="VenteParMoisOptions" />
            </div>
            
        </div>
        <div class="sec-graph">
            <div class="historique-produits">
            <Texte type="bold-primary" texte="Historique des produits vendus" />
            <table>
                <thead>
                <tr>
                    <th><Texte type="light" texte="Date de vente" /></th>
                    <th><Texte type="light" texte="Produit" /></th>
                    <th><Texte type="light" texte="Quantité" /></th>
                    <th><Texte type="light" texte="Prix Unitaire" /></th>
                    <th><Texte type="light" texte="Total" /></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in historiqueProduitsVendus" :key="index">
                    <td><Texte type="light" :texte="item.date.toLocaleDateString()" /></td>
                    <td><Texte type="light" :texte="item.produit" /></td>
                    <td><Texte type="light" :texte="item.quantite" /> </td>
                    <td><Texte type="light" :texte="item.prix_unitaire + '€'" /></td>
                    <td><Texte type="light" :texte="item.total +'€'" /></td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="classement">
                <Texte type="light" texte="Top des produits les plus vendus" />
                <Texte type="light" v-for="(product, index) in productSales" :key="product.id" :texte="`${index + 1}. ${product.product_label} (${product.qty})`" />
        </div>
        </div>
      </div>

    </Frame>
  </template>
  
  <style lang="scss" scoped>
  .historique-produits {
  margin-left: 64px;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(5px);
  padding: 10px;
  border-radius: 8px;
}

.historique-produits table {
  width: 100%;
  border-collapse: collapse;
}
.historique-produits th,
.historique-produits td {
  padding: 8px;
  border-bottom: 1px solid $primary;
  text-align: left;
}
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
    border-radius: $radius-gm 0px;
    background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(5px);
    padding: 50px;
    border-radius: 8px;
  }
  .Pie-container {
    @include position-contenus(flex, center, center);
    width: auto;
    height: 50%;
    border-radius: $radius-pm 0px;
    background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(5px);
    padding: 20px;
    border-radius: 8px;
  }
  
  .filters {
    display: flex;
    gap:16px;
    position: fixed;
    top: 0px;
    left: 164px;
    margin: 10px;
    width: 30px;
    z-index: 9999;
    select {
        @include bouton-variant($primary, $primary, $radius-pm, $stara);
        width: 200px;
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
  .entete{
    @include position-contenus(flex, baseline, baseline);
    flex-direction: column;
    width: 100%;
    height: 30%;
    padding: 64px 172px;
    border-radius: 8px;
  }
  </style>
  