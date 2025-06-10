<template>
  <main class="full-page">
    <form @submit.prevent="signIn" class="form">
      <h1 class="title">Welcome Back!</h1>

      <div class="input-group">
        <span class="icon">👤</span>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="input-group">
        <span class="icon">🔒</span>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          required
        />
        <span class="toggle" @click="togglePassword">👁️</span>
      </div>

      <button type="submit" class="sign-in-btn">Sign In</button>


      <button type="button" class="google-btn" @click="signInWithGoogle">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
        />
      </button>

      <p class="register-text">
        <router-link to="/register">Sign Up</router-link>
      </p>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const showPassword = ref(false)
const router = useRouter()

const signIn = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => router.push('/profile'))
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Wrong password'
          break
        default:
          errMsg.value = 'Something went wrong'
      }
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => router.push('/profile'))
    .catch(() => {
      errMsg.value = 'Google sign-in failed'
    })
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f4f6;
}

.full-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  font-size: 24px;
  color: #111827;
  margin-bottom: 0.5rem;
}

.input-group {
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 999px;
  font-size: 16px;
  background-color: white;
}

.icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
}

.toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.forgot-password {
  font-size: 0.875rem;
  text-align: right;
  color: #10b981;
  text-decoration: none;
  margin-top: -0.5rem;
}

.sign-in-btn {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;
  max-width: 20vh;
}

.sign-in-btn:hover {
  background-color: #059669;
}

.separator {
  text-align: center;
  color: #6b7280;
}

.google-btn {
  background: white;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-btn img {
  width: 24px;
  height: 24px;
}

.register-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.register-text a {
  color: #10b981;
  text-decoration: none;
}
</style>
