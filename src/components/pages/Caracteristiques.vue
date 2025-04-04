<script setup>
import { ref } from "vue";
import Frame from "../organisms/Frame.vue";
import Bouton from "../atoms/Bouton.vue";
import Texte from "../atoms/Texte.vue";

const selectedButton = ref(null); // Stocke le bouton cliqué
</script>

<template>
  <Frame>
    <div class="container">
      <div class="titre">
        <Texte type="bold-light" :texte="'Autres'" />
        <Texte type="light" :texte="'Caractéristiques'" />
      </div>

      <div class="areabutton-1">
        <Transition name="fade">
          <Bouton
            v-if="selectedButton === null || selectedButton === 'A'"
            :type="'primary'"
            :texte="'A'"
            @click="selectedButton = selectedButton === 'A' ? null : 'A'"
            :class="{ center: selectedButton === 'A' }"
          />
        </Transition>
        <div class="details" v-if="selectedButton === 'A'">
            <Texte type="black-light" :texte="'Confort'" />
            <Texte type="primary" :texte="'Pneus tubeless, géométrie ajustable, guidon ergonomique.'" />
        </div>
      </div>

      <div class="areabutton-2">
        <Transition name="fade">
          <Bouton
            v-if="selectedButton === null || selectedButton === 'B'"
            :type="'primary'"
            :texte="'B'"
            @click="selectedButton = selectedButton === 'B' ? null : 'B'"
            :class="{ center: selectedButton === 'B' }"
          />
        </Transition>
        <div class="details" v-if="selectedButton === 'B'">
            <Texte type="black-light" :texte="'Vitesse'" />
            <Texte type="primary" :texte="'15 % plus rapide grâce à des technologies avancées.'" />
        </div>
      </div>

      <div class="areabutton-3">
        <Transition name="fade">
          <Bouton
            v-if="selectedButton === null || selectedButton === 'C'"
            :type="'primary'"
            :texte="'C'"
            @click="selectedButton = selectedButton === 'C' ? null : 'C'"
            :class="{ center: selectedButton === 'C' }"
          />
        </Transition>
        <div class="details" v-if="selectedButton === 'C'">
            <Texte type="black-light" :texte="'Matériaux'" />
            <Texte type="primary" :texte="'Fibre de carbone, aluminium forgé, titane, nanotubes de carbone.'" />
        </div>
      </div>
    </div>
  </Frame>
</template>

<style lang="scss" scoped>
.container {
  @include position-contenus(flex, baseline, flex-start);
  gap: 82px;
  flex-direction: column;
  background: url("@/assets/img/stellarzbike.png") lightgray 50% / cover no-repeat;
  width: 100%;
  height: 768px;
  padding: 128px;
  box-shadow: 0px -227px 250px -2px #000 inset;
}

.titre {
  @include scrollable;
}

/* Position de base des boutons */
.areabutton-1 {
  @include position-contenus(flex, center, flex-start);
  flex-direction: column;
  gap: 16px;
  position: relative;
  margin: -100px 0px 0px 450px;
  @include scrollable;

}

.areabutton-2 {
  @include position-contenus(flex, center, flex-start);
  flex-direction: column;
  gap: 16px;
  position: relative;
  margin: -50px 0px 0px 850px;
  @include scrollable;

}

.areabutton-3 {
  @include position-contenus(flex, center, flex-start);
  flex-direction: column;
  gap: 16px;
  position: relative;
  margin: 50px 0px 0px 620px;
  @include scrollable;

}

/* Animation de disparition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Animation de recentrage */
.center {
  position: absolute;
  left: 0%;
  top: 0%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;
}
.details{
    border-radius: $radius-gm 0px;
    background: rgba(28, 34, 44, 0.05);
    backdrop-filter: blur(20px);
    padding: 20px;
    margin-top: 10px;
}
</style>
