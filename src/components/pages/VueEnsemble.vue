<script setup>
import Frame from "../organisms/Frame.vue";
import Texte from "../atoms/Texte.vue";
import { ref } from "vue";

const media = ref([
  { type: "image", src: new URL('@/assets/img/Canyon 2.png', import.meta.url).href }, // Une vidéo
  { type: "image", src: new URL('@/assets/img/Canyon 3.png', import.meta.url).href },
  { type: "video", src: new URL('@/assets/img/Video.mp4', import.meta.url).href }

]);

const mainMedia = ref(media.value[0]); // Média principal affiché
const nextMedia = ref(null); // Stocke temporairement le prochain média
const autoPlay = ref(false); // Pour la vidéo principale
const changeMainMedia = (newMedia) => {
  if (newMedia.src !== mainMedia.value.src) {
    nextMedia.value = newMedia;
    setTimeout(() => {
      mainMedia.value = newMedia;
      nextMedia.value = null; // Reset après l'animation
    }, 500); // Durée de la transition
  }
};
</script>



<template>
    <Frame>
        <div class="container">
            <div class="text">
                <Texte type="bold-light" texte="Vue d'ensemble" />
            </div>  
            <div class="photo-container">
                <!-- Affichage principal -->
                <component 
                    :is="mainMedia.type === 'video' ? 'video' : 'img'" 
                    :src="mainMedia.src"
                    @click="autoPlay = true"
                    class="main-media"
                    v-bind="mainMedia.type === 'video' ? { autoplay: true, loop: true, muted: true } : {}"
                />

                <!-- Transition de changement -->
                <Transition name="fade">
                    <component 
                        v-if="nextMedia" 
                        :is="nextMedia.type === 'video' ? 'video' : 'img'"
                        :src="nextMedia.src" 
                        class="next-media"
                        v-bind="nextMedia.type === 'video' ? { autoplay: false, loop: true, muted: false } : {}"
                    />
                </Transition>
            </div>

            <!-- Miniatures -->
            <div class="canvas">
                <div 
                    v-for="(item, index) in media" 
                    :key="index" 
                    class="mini" 
                    @click="changeMainMedia(item)"
                >
                    <component 
                        :is="item.type === 'video' ? 'video' : 'img'"
                        :src="item.src"
                        class="mini-preview"
                        v-bind="item.type === 'video' ? { autoplay: true, loop: true, muted: true } : {}"
                    />
                </div>
            </div>
        </div>
    </Frame>
</template>


<style lang="scss" scoped>
    .container {
        @include position-contenus(flex, center, center);
        flex-direction: column;
        gap: 16px;
    }
    
    .text {
        @include position-contenus(flex, baseline, center);
        width: 100%;
        @include scrollable;
    }

    .photo {
        height: 471px;
        align-self: stretch;
        aspect-ratio: 1028/471;
        border-radius: $radius-gm 0px;
        img {
            width: 100%;
            height: 100%;
            border-radius: $radius-gm 0px;
            object-fit: cover;
        }
    }

    .canvas {
        @include position-contenus(flex, center, center);
        width: 100%;
        gap: 54px;
    }

    .mini {
        cursor: pointer;
        width: 193px;
        height: 109px;
        border-radius: $radius-pm 0px;
        
        img {
            width: 100%;
            height: 100%;
            border-radius: $radius-pm 0px;
            object-fit: cover;
        }
    }
    .photo-container {
    position: relative;
    height: 471px;
    align-self: stretch;
    aspect-ratio: 1028/471;
    border-radius: $radius-gm 0px;
    overflow: hidden;
}

.main-media, .next-media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: $radius-gm 0px;
    object-fit: cover;
}

.next-media {
    opacity: 0;
}

/* Transition */
.fade-enter-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

/* Miniatures */
.mini {
    cursor: pointer;
    width: 193px;
    height: 109px;
    border-radius: $radius-pm 0px;
}

.mini-preview {
    width: 100%;
    height: 100%;
    border-radius: $radius-pm 0px;
    object-fit: cover;
}


</style>
