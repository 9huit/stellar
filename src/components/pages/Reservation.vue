<script setup>
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import Bouton from '@/components/atoms/Bouton.vue';
import Input from '@/components/atoms/Input.vue';
import Select from '@/components/atoms/Select.vue';
</script>
<template>
    <Frame>
        <div class="container">
            <div class="main">
                <div class="text">
                    <Texte type="bold-light" texte="Prendre un Rendez-vous." />
                </div>
                <div class="form">
                    <div class="exit">
                        <Bouton :type="'secondary'" :texte="'X'" @click="$emit('close')"/>
                    </div>
                    <form action="">
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Nom" />
                                <Input type="text" placeholder="Entrer votre Nom"/>
                            </div>
                            <div>
                                <Texte type="light" texte="Prenom" />
                                <Input type="text" placeholder="Entrer votre Prenom"/>
                            </div>
                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Email/telephone" />
                                <Input type="text" placeholder="Entrer votre Email/telephone"/>
                            </div>
                            <div>
                                <Texte type="light" texte="Boutique" />
                                <Select />
                            </div>
                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Date de rendez-vous" />
                                <Input type="date"/>
                            </div>
                            <div>
                                <Texte type="light" texte="Heure de rendez-vous" />
                                <Input type="time"/>
                            </div>
                        </div>
                            <Bouton :type="'primary'" :texte="'Confirmer le rendez-vous'"/>
                    </form>
                </div>
            </div>
        </div>
    </Frame>
</template>
<style scoped lang="scss">
.container {
    position: fixed;
    top: 0;
    left: 0;
    @include position-contenus(flex, center, center);
    width: 100%;
    height: 768px;
    box-shadow: 0px 4px 75px 393px rgba(0, 0, 0, 0.80) inset;
    z-index: 9998;
}
.main{
    @include position-contenus(flex, space-between, center);
    border-radius: $radius-gm 0px;
    background-color: $dark;
    width: 1045px;
    height: 544px;
    flex-shrink: 0;
    padding-left: 125px
}
.text{
    @include position-contenus(flex, center, center);
    width: 156px;
}
.form{
    @include position-contenus(flex, baseline, center);
    flex-direction: column;
    width: 643px;
    height: 100%;
    background-color: $secondary;
    border-radius: $radius-gm 0px;
    gap: 80px;
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
</style>
