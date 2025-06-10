<template>
  <div class="offers-page">
    <h1 class="offers-title">Propiedades en Oferta</h1>

    <div v-if="offers.length" class="offers-grid">
      <ListingCard
        v-for="offer in offers"
        :key="offer.id"
        :listing="offer"
      />
    </div>

    <div v-else class="no-offers">
      No hay propiedades en oferta actualmente.
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ListingCard from '../components/ListingCard.vue';

export default {
  components: { ListingCard },
  data() {
    return {
      offers: []
    };
  },
  async mounted() {
    const q = query(collection(db, 'listings'), where('oferta', '==', true));
    const snapshot = await getDocs(q);
    this.offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
</script>

<style scoped>
.offers-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.offers-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-offers {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 2rem;
}
</style>
