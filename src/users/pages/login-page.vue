<template>
  <div class="login-page">
    <login-form @login="handleLogin" />
  </div>
</template>

<script setup>
import LoginForm from '../components/login-form.vue'
import { loginUser } from '../services/user-service.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const error = ref(null)

const handleLogin = async (credentials) => {
  try {
    const user = await loginUser(credentials.email, credentials.password)

    if (user) {
      // Aquí puedes guardar la sesión en localStorage o en un store
      console.log('Usuario logueado:', user)
      router.push('/') // redirige a la página de inicio o dashboard
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.')
    }
  } catch (err) {
    alert('Error al iniciar sesión.')
    console.error(err)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}
</style>
