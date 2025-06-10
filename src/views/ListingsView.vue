<template>
    <div>
        <h1>Propiedades en {{ tipo }}</h1>
        <div v-if="listings.length">
            <ListingCard v-for="listing in listings" :key="listing.id" :listing="listing"/>
        </div>
        <div v-else>
            <p>No hay propiedades en {{ tipo }}</p>
        </div>
    </div>
</template>

<script>

import {db} from '../firebase';
import {collection, query, where, getDocs} from 'firebase/firestore';
import ListingCard from '../components/ListingCard.vue';

export default {
    components: {ListingCard},
    data() {
        return {
            listings: [],
            tipo: '',
        }
    },
    async mounted() {
        this.tipo = this.$route.params.tipo;

        const q = query(
            collection(db, 'listings'),
            where('tipo', '==', this.tipo)
        );
        const snapshot = await getDocs(q);
        this.listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    }
}

</script>