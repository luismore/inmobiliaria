<template>
    <div>
        <img :src="listing.images[0]" class="rounded"/>
        <h2>{{ listing.nombre }}</h2>
        <h2>{{ listing.precio }}</h2>
        <h2>{{ listing.tipo }}</h2>
        <router-link :to= "`/listing/${listing.id}`">Ver mas</router-link>
    </div>
</template>

<script>
export default{
    props: ['listing'],
}
</script>