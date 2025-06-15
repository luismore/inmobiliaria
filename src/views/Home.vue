<template>
  <div class="home-container">
    <section class="featured">
      <h1 class="title">Explore</h1>
      <h3>Recommeded</h3>
      <ListingCard v-if="randomOffer" :listing="randomOffer" />
    </section>


  <h3>Categories</h3>
  <section class="explore-links">
    <router-link class="link-card alquiler" to="/listings/tipo/alquiler">
      <img src="../assets/Rent.jpg" alt="Alquiler" />
      <h3>Places for rent</h3>
    </router-link>

    <router-link class="link-card venta" to="/listings/tipo/venta">
      <img src="../assets/Sale.jpg" alt="Venta" />
      <h3>Places for sale</h3>
    </router-link>
  </section>

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


<style scoped>
.home-container {
  margin: 0 auto;
  padding: 2rem 1rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.featured {
  margin-bottom: 2rem;
}

.explore-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 1rem;
}

.link-card {
  display: flex;
  flex-direction: column;
  width: 48%;
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: scale(1.02);
}

.link-card img {
  width: 100%;
  height: 30rem;
  border-radius: 20px;
  object-fit: cover;
}

.link-card p {
  margin-top: 0.8rem;
  font-weight: 500;
  font-size: 1rem;
  padding-left: 0.5rem;
}

</style>