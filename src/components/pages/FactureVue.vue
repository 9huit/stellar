<script setup>
import { onMounted, ref } from 'vue'
import Texte from '../atoms/Texte.vue';
import html2pdf from 'html2pdf.js';

const user = JSON.parse(sessionStorage.getItem('user'))
const props = defineProps({
        reference: [String, Number],
        facture: [String, Number],
    })
    const form = ref(null);

const exportToPDF = () => {
  const element = document.querySelector('.facturation');
  const opt = {
    margin: 10,
    filename: `facture_${props.facture.ref}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };
  html2pdf().from(element).set(opt).save();
};

</script>
<template>
    <div class="facturation">
                        <button @click="exportToPDF">Exporter</button>
    <div class="cont">
        <div class="entete">
            <div class="Gauche">
                <Texte type="bold-dark" :texte="'Magasin M'"/>
                <a :href="'http://localhost/dolibarr-21.0.0/htdocs/document.php?modulepart=facture&entity=1&file='+facture.ref+'%2F'+facture.ref+'.pdf'" target="_blank"><i class="fas fa-file-pdf"></i></a>
            </div>
            <div class="droite">
                <Texte type="bold-dark" :texte="'Facture ' + facture.ref"/>
                <Texte type="dark" :texte="'Date facturation: ' + Date(reference.date_creation * 1000)"/>
                <Texte type="dark" :texte="'Date facturation: ' + Date(reference.date_validation * 1000)"/>
                <Texte type="dark" :texte="'Code client: ' + user.code_client"/>
            </div>
        </div>


        <div class="entete">
            <div class="Gauche">
                <Texte type="dark" :texte="'Emetteur'"/>
                <Texte type="bold-dark" :texte="'Magasin M'"/>
            </div>
            <div class="droite">
                <Texte type="dark" :texte="'adressé a'"/>
                <Texte type="bold-dark" :texte="user.name"/>
            </div>
        </div>

        <div class="entete">
            <div class="gauche">
                <Texte type="dark" :texte="'Commande'"/>
            <Texte type="bold-dark" :texte="reference.ref"/>
            </div>
        </div>
        <div class="entete">
            <div class="gauche">
                <Texte type="dark" :texte="' Catégorie dopérations : Livraison de marchandises'"/>
            </div>
            <div class="droite">
                <Texte type="dark" :texte="' Montants exprimés en ' + reference.multicurrency_code"/>
            </div>
        </div>
        <div class="entete">
            <table >
                <thead>
                <tr>
                    <th><Texte type="dark" texte="Designation" /></th>
                    <th><Texte type="dark" texte="TVA" /></th>
                    <th><Texte type="dark" texte="PU HT" /></th>
                    <th><Texte type="dark" texte="QTE" /></th>
                    <th><Texte type="dark" texte="Total HT" /></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="line in facture.lines" :key="line.id">
                    <td><Texte type="black" :texte="line.desc" /></td>
                    <td><Texte type="black" :texte="line.tva_tx" /></td>
                    <td><Texte type="black" :texte="line.subprice" /> </td>
                    <td><Texte type="black" :texte="line.qty" /></td>
                    <td><Texte type="black" :texte="Number(line.total_ht) +'€'" /></td>
                </tr>
                </tbody>

            </table>
        </div>
        <div class="entete">
            <div class="gauche">
                <Texte type="dark" :texte="' Total HT ' + facture.multicurrency_total_ht"/>
                <Texte type="dark" :texte="' Total TVA ' + facture.multicurrency_total_tva"/>
                <Texte type="dark" :texte="' Total TTC ' + facture.multicurrency_total_ttc"/>
                <Texte type="dark" :texte="' Paye ' + facture.totalpaid"/>
                <Texte type="dark" :texte="' reste a payer ' + facture.remaintopay"/>
                
            </div>
        </div>
        <div class="entete">
            <div class="droite" v-if="parseFloat(facture.totalpaid) < parseFloat(facture.multicurrency_total_ttc)">
            
            <table >
                <thead>
                <tr>
                    <th><Texte type="dark" texte="reglement" /></th>
                    <th><Texte type="dark" texte="montant" /></th>
                    <th><Texte type="dark" texte="type" /></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><Texte type="black" :texte="Date(facture.datem*1000)" /> </td>
                    <td><Texte type="black" :texte="Number(facture.sumpayed)+ '€'"  /></td>
                    <td><Texte type="black" :texte="facture.mode_reglement_id" /></td>
                </tr>
                </tbody>

            </table>
        </div>
        </div>
        <!-- <p>{{ reference }}</p> -->
    </div>
</div>
</template>
<style lang="scss" scoped>
    .cont{
        position: fixed;
        top: 0;
        left: 0;
        @include position-contenus(flex, center, center);
        flex-direction: column;
        gap: 16px;
        background-color: #fff;
        width: 100%;
        height: 768px;
    }
    .entete{
        @include position-contenus(flex, space-between, flex-start);
        width: 100%;
        padding: 0px 200px;
        // background-color: #fff;
    }
    i{
        color: $dark;
    }
    table {
        border-width: 2px;
        border-color: $dark;
  width: 100%;
  border-collapse: collapse;
}

</style>