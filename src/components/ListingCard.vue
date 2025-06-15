<script setup>
defineProps(['listing'])
</script>

<template>
  <div v-if="listing" class="listing-card">
    <router-link :to="`/listings/id/${listing.id}`" class="card-link">
      <img
        v-if="listing.images && listing.images.length > 0"
        :src="listing.images[0]"
        alt="Imagen de la propiedad"
        class="listing-img"
      />

      <div class="listing-details">
        <p class="address">{{ listing.direccion }}</p>
        <h2 class="name">{{ listing.nombre }}</h2>
        <p class="price">${{ listing.precio.toLocaleString() }} / Month</p>

        <div class="features">
          <span><i class="fas fa-bed"></i> {{ listing.dormitorios }} Bedroom<span v-if="listing.dormitorios > 1">s</span></span>
          <span><i class="fas fa-bath"></i> {{ listing.banos }} Bathroom<span v-if="listing.banos > 1">s</span></span>
        </div>
      </div>
    </router-link>
  </div>

  <div v-else>
    <p>Cargando propiedad...</p>
  </div>
</template>

<style scoped>
.listing-card {
  display: flex;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.listing-card:hover {
  transform: scale(1.01);
}

.card-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.listing-img {
  width: 220px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
}

.listing-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.address {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #000;
}

.price {
  font-weight: bold;
  color: #00C26A;
  margin-bottom: 0.5rem;
}

.features {
  display: flex;
  gap: 1.5rem;
  color: #333;
  font-size: 0.95rem;
}

.features i {
  margin-right: 0.3rem;
}
</style>
