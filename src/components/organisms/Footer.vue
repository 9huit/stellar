<script setup>
import Texte from '@/components/atoms/Texte.vue'
</script>
<template>
    <footer>
        <div class="footer">
            <div class="top">
                <div class="marque">
                    <p>
                        <span class="stellar">stellar</span> 
                        <span class="z">z</span>
                    </p>
                    <Texte :type="'bold-light'" :texte="'Stellar, le meilleur à chaque tournant.'"/>
                    <div class="social">
                        <img src="../../assets/img/uil_facebook.svg" alt="">
                        <img src="../../assets/img/mingcute_instagram-fill.svg" alt="">
                        <img src="../../assets/img/mdi_linkedin.svg" alt="">
                    </div>
                    
                </div>
                <div class="section1">
                        <Texte :type="'light'" :texte="'A propos de nous'"/>
                        <Texte :type="'light'" :texte="'Ville'"/>
                        <Texte :type="'light'" :texte="'Produits'"/>
                        <Texte :type="'light'" :texte="'Technologie'"/>
                        <Texte :type="'light'" :texte="'Blog'"/>
                </div>
                <div class="section1">
                        <Texte :type="'light'" :texte="'Option de paiement'"/>
                        <Texte :type="'light'" :texte="'Livraison'"/>
                        <Texte :type="'light'" :texte="'FAQ'"/>
                        <Texte :type="'light'" :texte="'Sortie'"/>
                </div>
                <div class="section1">
                        <Texte :type="'light'" :texte="'Magasin Avenue Rockford, 165331561'"/>
                        <Texte :type="'light'" :texte="'Téléphone . 06 324 55 12'"/>
                        <Texte :type="'light'" :texte="'Site web officiel .     www.stellarofficial.com'"/>
                </div>
            </div>
            <div class="bottom">
                <hr>
                <Texte :type="'light'" :texte="'ETU002889 - Rakotonirina Andrianina Nantenaina'"/>
            </div>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
hr{
    background-color: $light;
    width: 1025px;
height: 2px;
}
    .footer{
        @include position-contenus(flex, center, center);
        flex-direction: column;
        width: 100%;
        background: $secondary;
        padding: 64px;
        gap: 24px;
        
    }
    .top{
        @include position-contenus(flex, center, flex-start);
        width: 100%;
        gap: 16px;
        align-content: flex-start;
    }
    .bottom{
        @include position-contenus(flex, center, center);
        flex-direction: column;
        gap: 16px;
        align-self: stretch;
    }
    .stellar{
        color: $primary;
        text-align: center;
        font-family: Ammonite;
        font-size: 48px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .z{
        color: $primary;
        font-family: "AZN Unified";
        font-size: 46px;
        font-style: normal;
        font-weight: 401;
        line-height: normal;
    }
    .marque{
        @include position-contenus(block, center, space-between);
        width: 297px;
    }
    .social{
        @include position-contenus(flex, baseline, space-between);
        padding: 17px 0px;
        gap: 17px;
        align-self: stretch;
    }
    .section1{
        @include position-contenus(flex, center, flex-start);
        flex-direction: column;
        width: 297px;
        gap: 24px;
    }
    
</style>