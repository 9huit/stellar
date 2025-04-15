<script setup>
import Frame from '@/components/organisms/Frame.vue';
import Texte from '@/components/atoms/Texte.vue';
import Bouton from '@/components/atoms/Bouton.vue';
import Input from '@/components/atoms/Input.vue';
import { loginUser, SignupAPI } from '@/controllers/UserController';
import {ref} from 'vue';
const newaccount = ref(false);
var nom = ref('')
var email = ref('')
var alias = ref('')
var phone = ref('')
const emit = defineEmits(['close'])
const msg = ref('')


const handleSubmit = () => {
 loginUser(nom.value, email.value, emit)
    .then(response => {
        msg.value = response.msg;  // Met à jour le message avec la réponse
        })
}

const signupSubmit = () => {
    SignupAPI(nom.value, alias.value, email.value, phone.value)
    setTimeout(() => {
        loginUser(nom.value, email.value, emit);
        }, 3000);
    
}

</script>
<template>
        <div class="container">
            <div class="main">
                <div class="text" >
                    <Texte type="bold-light" texte="Se Connecter." v-if="!newaccount"/>
                    <Texte type="bold-light" texte="Créer un compte." v-else="newaccount"/>
                </div>
                <div class="form">
                    <div class="exit">
                        <Bouton :type="'secondary'" :texte="'X'" @click="$emit('close'), newaccount = false"/>
                    </div>
                    <form action="" v-show="!newaccount" @submit.prevent="handleSubmit">
                        <Texte type="black-error" :texte="msg" />
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="identifiant" />
                                <Input type="text" placeholder="Entrez votre identifiant" :name="'nom'" v-model="nom" />
                            </div>
                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Entrer votre email" />
                                <Input type="email" placeholder="Entrez votre email." :name="'email'" v-model="email"/>
                            </div>
                            
                        </div>
                            <Bouton :type="'primary'" :texte="'Se connecter a mon Stellar'"/>
                            <div class="sign">
                            <Texte  type="grey" texte="Vous venez d'arriver ? "/>
                                <Texte  type="primary" texte="S'inscrire" @click="newaccount = true" style="cursor: pointer;"/>
                        </div>

                    </form>
                    <form action="" v-show="newaccount" @submit.prevent="signupSubmit">
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="Nom" />
                                <Input type="text" placeholder="Entrez votre nom" :name="nom" v-model="nom"/>
                            </div>
                        
                            <div>
                                <Texte type="light" texte="Nom alternatif" />
                                <Input type="text" placeholder="Entrez votre nom alernatif" :name="alias" v-model="alias"/>
                            </div>
                        </div>
                        <div class="form-line">
                            <div>
                                <Texte type="light" texte="email" />
                                <Input type="email" placeholder="Entrez votre email." :name="email" v-model="email"/>
                            </div>
                            
                        
                            <div>
                                <Texte type="light" texte="numero de telephone" />
                                <Input type="text" placeholder="Entrez votre numero de telephone." :name="phone" v-model="phone"/>
                            </div>
                            
                        </div>
                            <Bouton :type="'primary'" :texte="'Confirmer mon inscription'"/>
                            <div class="sign">
                            <Texte  type="grey" texte="J'ai deja un compte "/>
                            <Texte  type="primary" texte="Se connecter" @click="newaccount = false" style="cursor: pointer;"/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
</template>
<style scoped lang="scss">
.sign{
    display: flex;
    gap: 8px;
}
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
