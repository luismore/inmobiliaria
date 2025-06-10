<template>
    <div>
        <h1>Propiedades en Oferta</h1>
        <div v-if="offers.length">
            <ListingCard
                v-for="offer in offers"
                :key="offer.id"
                :listing="offer"
            />
        </div>
        <div v-else>No hay propiedades en oferta</div>
    </div>
</template>

<script>

    import {db} from '../firebase';
    import {collection} from 'firebase/firestore';
    import ListingCard from '../components/ListingCard.vue';

    export default {
        components: {ListingCard},
        data() {
            return {
                offers: []
            }
        },
        async mounted() {
            const q = query(collection(db, 'listings'), where('oferta', '==', true));
            const snapshot = await getDocs(q);
            this.offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        }
    }

</script>