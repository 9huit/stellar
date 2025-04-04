<script setup>
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import Bouton from '@/components/atoms/Bouton.vue';
import Reservation from './Reservation.vue';
import { ref } from 'vue';

// Variable réactive pour afficher/cacher Reservation
const showReservation = ref(false);
</script>
<template>
        <Frame>
            <div class="reservation">
                <Reservation  v-show="showReservation" @close="showReservation = false"/>
            </div>
            <div class="container">
                <div class="accroche">
                    <p>
                        <span class="stellar">stellar</span> 
                        <span class="z">z</span>
                    </p>
                    <Texte type="bold-light" :texte="'Domptez les sentiers les plus sauvages avec un confort et une fiabilité inégalés.'"/>
                    <div class="boutons">
                        <Bouton :type="'primary'" :texte="'Essayez-le en magasin'" @click="showReservation = true"/>
                        <Bouton :type="'secondary'" :texte="'En savoir plus'"/>
                    </div>
                </div>
                <div class="caracteristiques">
                    <div class="carac">
                        <Texte type="black-light" :texte="'5kg'"/>
                        <Texte type="primary" :texte="'Ultra leger'"/>
                    </div>
                    <div class="carac">
                        <Texte type="black-light" :texte="'Suspension'"/>
                        <Texte type="primary" :texte="'Pneumatique'"/>
                    </div>
                    <div class="carac">
                        <Texte type="black-light" :texte="'Freins'"/>
                        <Texte type="primary" :texte="'Hydrauliques'"/>
                    </div>
                    <div class="carac">
                        <Texte type="black-light" :texte="'12 vitesses'"/>
                        <Texte type="primary" :texte="'Transmission'"/>
                    </div>
                </div>
            </div>
        </Frame>
</template>
<style scoped lang="scss">

.container{
    @include position-contenus(flex, center, flex-start);
    gap: 122px;
    flex-direction: column;
    background: url("@/assets/img/Landing Photo.png") lightgray 50% / cover no-repeat;
    width: 100%;
    height: 768px;
    padding:64px;
    box-shadow: 0px -227px 250px -2px #000 inset;
}
.stellar{
        color: $primary;
        text-align: center;
        font-family: Ammonite;
        font-size: $size-xxl;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .z{
        color: $primary;
        font-family: "AZN Unified";
        font-size: $size-xxl;
        font-style: normal;
        font-weight: 401;
        line-height: normal;
    }
.accroche{
    @include position-contenus(flex, center, flex-start);
    flex-direction: column;
    width: 488px;
    gap: 16px;
    margin-left: 64px;
}
.boutons{
    @include position-contenus(flex, baseline, space-between);
    width: 100%;
    align-items: flex-start;
    gap: 24px;
}
.caracteristiques{
    @include position-contenus(flex, space-between, center);
    padding: 9px 85px;
    width: 100%;
    border-radius: $radius-gm 0px;
    background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(5px);
}
.carac{
    @include position-contenus(flex, center, center);
    flex-direction: column;
}

</style>