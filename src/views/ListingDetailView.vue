<template>
  <div v-if="listing" class="listing-container">
    <!-- Imagen principal con botón de compartir -->
    <div class="image-wrapper">
      <img :src="listing.images[0]" class="main-image" />
      <button class="share-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          class="bi bi-share" viewBox="0 0 16 16">
          <path
            d="M13.5 1a1.5 1.5 0 1 1-1.415 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 1h6.378A1.5 1.5 0 0 1 13.5 1z" />
          <path
            d="M13 5.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 .5-.5zM13 7.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 .5-.5zM13 9.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 .5-.5z" />
        </svg>
      </button>
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
