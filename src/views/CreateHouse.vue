<template>
  <div>
    <h1>Create a Listing</h1>

    <h2>Sell/Rent</h2>
<button @click="setTipoVenta" :class="{ active: ventaActiva }">Sell</button>
<button @click="setTipoAlquiler" :class="{ active: alquilerActiva }">Rent</button>


        
    <form @submit.prevent="handleSubmit">
      <h5>Name:</h5>
      <input type="text" v-model="nombre" placeholder="Nombre" required />
      <h5>Bedrooms:</h5>
        <input type="number" v-model.number="dormitorios" placeholder="Dormitorios" min="0" required />
      <h5>Bathrooms:</h5>
        <input type="number" v-model.number="banos" placeholder="Baños" min="0" required />
      <h5>Adress:</h5>
        <input type="text" v-model="direccion" placeholder="Dirección" required />
      <h5>Price:</h5>
        <input type="number" v-model.number="precio" placeholder="Precio" min="0" required />

        <label>
            <input type="checkbox" v-model="oferta" /> On Offer?
        </label>
        <input type="number" v-model.number="descuento" placeholder="Descuento (%)" min="0" max="100" :disabled="!oferta" />

        <input type="file" multiple accept="image/*" @change="handleFileChange" />


        <button type="submit">Upload</button>

        <p v-if="error" style="color:red">{{ error }}</p>
        <p v-if="success" style="color:green">Succesfully uploaded!</p>
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
const selectedBase64Images = ref([])


const db = getFirestore()
const storage = getStorage()

const ventaActiva = ref(false)
const alquilerActiva = ref(true)

function setTipoVenta() {
  tipo.value = 'venta'
  ventaActiva.value = true
  alquilerActiva.value = false
}

function setTipoAlquiler() {
  tipo.value = 'alquiler'
  ventaActiva.value = false
  alquilerActiva.value = true
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
      images: selectedBase64Images.value,
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
    selectedBase64Images.value = []
  }



function handleFileChange(event) {
  const files = Array.from(event.target.files)
  selectedBase64Images.value = []

  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      selectedBase64Images.value.push(reader.result)
    }
    reader.readAsDataURL(file)
  })
}


</script>
<style scoped>
body {
  background-color: #f4f6f8;
  padding: 1rem;
  color: #111;
}

h1, h2 {
  color: #111;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1.5rem;
  margin: 0.5rem 0.5rem 1rem 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #e0e0e0;
  color: #000;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #00C26A;
  color: #fff;
}

button.active {
  background-color: #00C26A;
  color: white;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; /* Optional for better appearance */
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

form {
  max-width: 500px;
  margin-left: 2rem; /* Center the form */
  padding: 0; /* Remove internal padding */
  background: transparent; /* Remove white background */
}

button[type="submit"] {
  width: 100%;
  background-color: #00C26A;
  color: white;
  font-weight: bold;
  font-size: 1rem;
}

button[type="submit"]:hover {
  background-color: #009a55;
}
h5 {
  margin: 0.5rem 0 0.2rem;
}


</style>
