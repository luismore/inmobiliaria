<template>
  <div class="container">
    <div class="profile-box">
      <div class="header">
        <h1>My Profile</h1>
        <button v-if="isLoggedIn" class="logout-btn" @click="handleSignOut">Logout</button>
      </div>

      <div class="section">
        <h2>Personal Details</h2>
        <div class="details-box">
          <p class="name">Luis Calvo</p>
          <p class="email">luiscalvomain@gmail.com</p>
        </div>
      </div>

      <router-link to="/createHouse" class="link-button">
        🏠 Sell or rent your home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
let auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f6fa;
}

.container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.profile-box {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 28px;
  color: #222;
  margin: 0;
}

.logout-btn {
  background-color: #00c46a;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #00a85a;
}

.section {
  margin-top: 30px;
}

.section h2 {
  font-size: 18px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.change-link {
  color: #00c46a;
  text-decoration: none;
  font-size: 14px;
}

.details-box {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 12px;
  margin-top: 10px;
}

.name {
  font-weight: bold;
  color: #333;
}

.email {
  color: #555;
  font-size: 14px;
}

.link-button {
  display: inline-block;
  margin-top: 30px;
  background-color: #e6e6e6;
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: #222;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.link-button:hover {
  background-color: #dcdcdc;
}
</style>
