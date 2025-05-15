<template>
  <div class="form-container">
    <h2>Registro de Cuenta</h2>
    <form @submit.prevent="handleRegister">

      <div class="field">
        <label for="name">Nombre completo</label>
        <InputText id="name" v-model="user.name" :class="{'p-invalid': submitted && !user.name}" />
        <small v-if="submitted && !user.name" class="p-error">El nombre es obligatorio.</small>
      </div>

      <div class="field">
        <label for="email">Correo electrónico</label>
        <InputText id="email" v-model="user.email" :class="{'p-invalid': submitted && !validEmail(user.email)}" />
        <small v-if="submitted && !validEmail(user.email)" class="p-error">Correo inválido.</small>
      </div>

      <div class="field">
        <label for="password">Contraseña</label>
        <Password id="password" v-model="user.password" toggleMask :feedback="false" :class="{'p-invalid': submitted && !user.password}" />
        <small v-if="submitted && !user.password" class="p-error">La contraseña es obligatoria.</small>
      </div>

      <Button label="Registrarse" type="submit" class="mt-3" />
      <Message v-if="success" severity="success" class="mt-3">¡Registro exitoso! Revisa tu correo.</Message>
      <Message v-if="errorMessage" severity="error" class="mt-3">{{ errorMessage }}</Message>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // aquí corregí useRouter que estabas importando mal
import { registerUser } from '../services/user-service.js'  // importación nombrada correcta

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const user = ref({
  name: '',
  email: '',
  password: ''
})

const submitted = ref(false)
const success = ref(false)
const errorMessage = ref('')

const router = useRouter()  // nota: con useRouter() no con  'import useRouter from ...'

function validEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

async function handleRegister() {
  submitted.value = true
  errorMessage.value = ''

  if (user.value.name && validEmail(user.value.email) && user.value.password) {
    try {
      await registerUser(user.value)  // Llamas directamente a la función importada
      success.value = true
      submitted.value = false
      user.value = { name: '', email: '', password: '' }
      setTimeout(() => router.push('/login'), 1500)
    } catch (error) {
      errorMessage.value = 'Error al registrar usuario. Intenta nuevamente.'
    }
  }
}
</script>


<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-color: #fff;
}
.field {
  margin-bottom: 1.5rem;
}
h2{
  color: #4da6a0;
}
label{
  color: black;
  padding-right: 50px;
}
</style>
