<template>
  <div class="detail-container" v-if="listing">
    <h1 class="listing-title">{{ listing.nombre }}</h1>

    <div v-if="listing.images?.length" class="image-gallery">
      <img
        v-for="(img, index) in listing.images"
        :key="index"
        :src="img"
        alt="Imagen de la propiedad"
        class="gallery-image"
      />
    </div>

    <div class="listing-info">
      <p><strong>Tipo:</strong> {{ listing.tipo }}</p>
      <p><strong>Dormitorios:</strong> {{ listing.dormitorios }}</p>
      <p><strong>Baños:</strong> {{ listing.banos }}</p>
      <p><strong>Dirección:</strong> {{ listing.direccion }}</p>
      <p><strong>Precio:</strong> {{ listing.precio }} €</p>
      <p v-if="listing.oferta">
        <strong>Oferta:</strong> Sí - Descuento {{ listing.descuento }}%
      </p>
      <p v-else><strong>Oferta:</strong> No</p>
    </div>
  </div>

  <div v-else class="loading">
    Cargando propiedad...
  </div>
</template>

<script>
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      listing: null
    }
  },

  async mounted() {
    const id = this.$route.params.id
    const docRef = doc(db, 'listings', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      this.listing = { id: docSnap.id, ...docSnap.data() }
    }
  }
}
</script>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.listing-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.gallery-image {
  max-width: 300px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.listing-info {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

.loading {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: #888;
}
</style>
