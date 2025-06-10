<template>
  <div class="home-container">
    <section class="featured">
      <h1 class="title">Explore</h1>
      <ListingCard v-if="randomOffer" :listing="randomOffer" />
    </section>


    <h2>Categories</h2>
    <section class="explore-links">
      <router-link class="link-card alquiler" to="/listings/tipo/alquiler">
        <img src="../assets/Rent.jpg" alt="Alquiler" />
        <h2>Ver propiedades en alquiler</h2>
      </router-link>
      
      <router-link class="link-card venta" to="/listings/tipo/venta">
        <img src="../assets/Sale.jpg" alt="Venta" />
        <h2>Ver propiedades en venta</h2>
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
  gap: 2rem;
  flex-wrap: wrap;
  justify-content:center;
}

.link-card {
  display: block;
  text-align: center;
  text-decoration: none;
  background: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.link-card:hover {
  transform: translateY(-5px);
}

.link-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.link-card h2 {
  font-size: 1.2rem;
  padding: 1rem;
  color: #333;
}
</style>