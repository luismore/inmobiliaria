<template>
    <div>
        <h1>Propiedad destacada</h1>
        <ListingCard :listing="randomOffer"/>
        <router-link to="/listings/alquiler">Ver en alquiler</router-link>
        <router-link to="/listings/venta">Ver en venta</router-link>
    </div>
</template>

<script>

import {db} from '../firebase';
import {collection, query, where, getDocs} from 'firebase/firestore';
import ListingCard from '../components/ListingCard.vue';

export default{
    components: {ListingCard},
    data() {
        return { randomOffer: null }
        listing: {images:[]}
    },

    async mounted() {
        const q = query(collection(db, 'listings'), where('oferta', '==', true));
        const querySnapshot = await getDocs(q);
        const offers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        this.randomOffer = offers[Math.floor(Math.random() * offers.length)];
    }
}
</script>