<template>
  <div class="page-container">
    <h1>Places for {{ tipo }}</h1>
    <div v-if="listings.length">
      <ListingCard v-for="listing in listings" :key="listing.id" :listing="listing" />
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

<style scoped>
.page-container {
  background-color: #f2f4f8;
  min-height: 100vh;
  padding: 2rem 1rem;
  max-width: 800px;
  margin-left: 3rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
</style>