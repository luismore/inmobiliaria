<template>
    <div v-if="listing">
        <h1> {{ listing.nombre }}</h1>
        <div v-if="listing.images && listing.images.length">
            <img
                v-for="(img, index) in listing.images"
                :key="index"
                :src="img"
                alt="Imagen"
                style="max-width: 300px; margin: 10px 0;"
            />
        </div>
        <p>Tipo: {{ lisitng.tipo }}</p>
        <p>Dormitorios: {{ lisitng.dormitorios }}</p>
        <p>Baños: {{ listing.banos }}</p>
        <p>Direccion: {{ listing.direccion }}</p>
        <p>Precio: {{ listing.precio }}</p>
        <p v-if="listing.oferta">Oferta: Si - Descuento {{ listing.descuento }}%</p>
        <p v-else>Oferta: No</p>
    </div>
    <div v-else>Cargando propiedad...</div>
</template>

<script>

import {db} from '../firebase';
import {doc, getDocs} from 'firebase/firestore';

export default {
    data() {
        return {
            listing: null
        }
    },

    async mounted() {
        const id = this.$route.params.id;
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            this.listing = { id: docSnap.id, ...docSnap.data() };
        }
    }
}

</script>