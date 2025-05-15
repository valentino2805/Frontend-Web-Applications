<script setup>
import LoginForm from '../components/login-form.vue'
import { loginUser } from '../services/user-service.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserSession } from '../services/user-session.store.js'

const router = useRouter()
const error = ref('')
const { setUser } = useUserSession()

const handleLogin = async (credentials) => {
  try {
    const user = await loginUser(credentials.email, credentials.password)

    if (user) {
      setUser(user) 
      error.value = ''
      router.push('/')
    } else {
      error.value = 'Credenciales incorrectas. Inténtalo de nuevo.'
    }
  } catch (err) {
    error.value = 'Error interno al intentar iniciar sesión.'
    console.error(err)
  }
}
</script>


<template>
  <div class="login-page">
    <login-form @login="handleLogin" :errorMessage="error" />
  </div>
</template>

