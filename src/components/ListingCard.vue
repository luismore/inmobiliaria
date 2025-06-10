<script setup>
defineProps(['listing'])
</script>

<template>
  <div v-if="listing" class="card">
    <router-link :to="`/listings/id/${listing.id}`">
      <img
        v-if="listing.images && listing.images.length > 0"
        :src="listing.images[0]"
        alt="Imagen de la propiedad"
        class="card-img"
      />

      <div class="card-content">
        <div class="card-tag" :class="listing.tipo">
          {{ listing.tipo === 'venta' ? 'Sale' : 'Rent' }}
        </div>

        <h2 class="card-title">{{ listing.nombre }}</h2>

        <p class="card-price">
          {{ listing.precio.toLocaleString() }} €
        </p>
      </div>
    </router-link>
  </div>

  <div v-else>
    <p>Cargando propiedad...</p>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  margin: 1rem auto;
}

.card:hover {
  transform: scale(1.01);
}

.card-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-tag {
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 8px;
  text-transform: uppercase;
}

.card-tag.venta {
  background-color: #d1f2eb;
  color: #117a65;
}

.card-tag.alquiler {
  background-color: #d6eaf8;
  color: #21618c;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.3rem 0;
text-transform: uppercase;

}

.card-price {
  font-size: 1.1rem;
  color: #2c3e50;
}
</style>
