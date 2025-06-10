<template>
  <div>
    <h1>Subir nueva casa</h1>

    <h2>Sell/Rent</h2>
    <button @click="setTipoVenta">Sell</button>        
    <button @click="setTipoAlquiler">Rent</button>

        
    <form @submit.prevent="handleSubmit">
      <input v-model="nombre" placeholder="Nombre" required />

        <input type="number" v-model.number="dormitorios" placeholder="Dormitorios" min="0" required />
        <input type="number" v-model.number="banos" placeholder="Baños" min="0" required />

        <input v-model="direccion" placeholder="Dirección" required />
        <input type="number" v-model.number="precio" placeholder="Precio" min="0" required />

        <label>
            <input type="checkbox" v-model="oferta" /> ¿Está en oferta?
        </label>

        <input type="number" v-model.number="descuento" placeholder="Descuento (%)" min="0" max="100" :disabled="!oferta" />


        <button type="submit">Subir casa</button>

        <p v-if="error" style="color:red">{{ error }}</p>
        <p v-if="success" style="color:green">¡Casa subida correctamente!</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const nombre = ref('')
const tipo = ref('')
const dormitorios = ref(0)
const banos = ref(0)
const direccion = ref('')
const precio = ref(0)
const oferta = ref(false)
const descuento = ref(0)
const error = ref('')
const success = ref(false)

const db = getFirestore()
const storage = getStorage()

function setTipoVenta() {
  tipo.value = 'venta'
}

function setTipoAlquiler() {
  tipo.value = 'alquiler'
}



async function handleSubmit() {
  error.value = ''
  success.value = false




    await addDoc(collection(db, 'listings'), {
      nombre: nombre.value,
      tipo: tipo.value,
      dormitorios: dormitorios.value,
      banos: banos.value,
      direccion: direccion.value,
      precio: precio.value,
      oferta: oferta.value,
      descuento: oferta.value ? descuento.value : 0,
      images: [],
      timestamp: Date.now(),
    })

    success.value = true

    nombre.value = ''
    tipo.value = ''
    dormitorios.value = 0
    banos.value = 0
    direccion.value = ''
    precio.value = 0
    oferta.value = false
    descuento.value = 0
}
</script>
