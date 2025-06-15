<template>
  <div v-if="listing" class="listing-container">
    <!-- Imagen principal con botón de compartir -->
    <div class="image-wrapper">
      <img :src="listing.images[0]" class="main-image" />
    </div>

    <!-- Contenido debajo -->
    <div class="details">
      <h1>{{ listing.nombre }} - ${{ listing.precio }}</h1>
      <p class="direccion">{{ listing.direccion }}</p>

      <div class="badge">For Rent</div>

      <p>{{ listing.dormitorios }} Bedrooms</p>
      <p>{{ listing.banos }} Bathrooms</p>
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
.listing-container {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f7fa;
}

.image-wrapper {
  position: relative;
  width: 100%;
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 600px;
}

.share-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.details {
  padding: 2rem 4rem;
}

.details h1 {
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.direccion {
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.8rem;
}

.badge {
  display: inline-block;
  background-color: #2ecc71;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
