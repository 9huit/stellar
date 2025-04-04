<script setup>
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import Bouton from '@/components/atoms/Bouton.vue';
import Input from '@/components/atoms/Input.vue';
import Textarea from '@/components/atoms/Textarea.vue';
</script>
<template>
    <Frame>
        <div class="container">
            <div class="entete">
                    <Texte type="bold-light" texte="Laissez" />
                    <Texte type="light" texte="un message." />
            </div>
            <div class="main">
                <div class="text">
                    <Texte type="bold-light" texte="Trouver le magain." />
                    <Bouton :type="'primary'" :texte="'Trouver'"/>
                </div>
                <div class="form">
                    <div class="exit">
                    </div>
                    <form action="">
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Nom" />
                                <Input type="text" placeholder="Entrer votre Nom"/>
                            </div>

                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Email/telephone" />
                                <Input type="text" placeholder="Entrer votre Email/telephone"/>
                            </div>

                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Message" />
                                <Textarea placeholder="Laissez-nous un message" />
                            </div>

                        </div>
                            <Bouton :type="'primary'" :texte="'Nous envoyer ce message'"/>
                    </form>
                </div>
            </div>
        </div>
    </Frame>
</template>
<style scoped lang="scss">
.container {
    @include position-contenus(flex, center, center);
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: 768px;
}
.main {
  @include position-contenus(flex, space-between, center);
  position: relative; // Nécessaire pour le ::before
  border-radius: $radius-gm 0px;
  width: 1226px;
  height: 544px;
  flex-shrink: 0;
  padding-left: 125px;
  border-radius: $radius-gm 0px $radius-gm 0px;
  overflow: hidden; // Pour éviter que le ::before déborde

  // Le fond de la carte + couleur avec transparence
  background: url('../../assets/img/Map.png') center/cover no-repeat;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5); // ou utilise $dark avec opacité
    z-index: 0;
    // backdrop-filter: blur(5px);
  }

  // Pour que le contenu passe au-dessus du ::before
  > * {
    position: relative;
    z-index: 1;
  }
}

.text{
    @include position-contenus(flex, center, baseline);
    gap: 16px;
    flex-direction: column;
    width: 156px;
}
.form{
    @include position-contenus(flex, center, center);
    flex-direction: column;
    width: 402px;
    height: 100%;
    background-color: $secondary;
    border-radius: $radius-gm 0px;
}
form{
    @include position-contenus(flex, baseline, flex-start);
    flex-direction: column;
    // height: 100%;
    gap: 16px;
}
.form-line{
    @include position-contenus(flex, baseline, flex-start);
    // height: 100%;
    gap: 16px;
}
.text-light{
    margin-left: 24px;
}
.exit{
    @include position-contenus(flex, flex-end, center);
    width: 100%;
    padding: 16px;
}
.entete{
    @include position-contenus(flex, flex-start, baseline);
    @include scrollable;
    flex-direction: column;
    width: 100%;
    padding-left: 128px;
    // background-color: #fff;
}
</style>
