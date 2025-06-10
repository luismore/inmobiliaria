<template>

        <router-link to="/createHouse">Sell or rent your Home</router-link>

    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
    

</template>

<script setup>

import {onMounted, ref} from 'vue'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import {useRouter} from 'vue-router'

const router = useRouter()

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user){
            isLoggedIn.value = true;
        }
        else{
            isLoggedIn.value = false;
        }
    })
})

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/')
    })
}

</script>