<template>
  <div class="login-form-container">
    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin">
      <div class="p-field">
        <label for="email">Correo electrónico</label>
        <InputText id="email" v-model="email" type="email" placeholder="Ingresa tu correo" />
        <small v-if="submitted && !email" class="p-error">El correo es obligatorio</small>
      </div>

      <div class="p-field">
        <label for="password">Contraseña</label>
        <Password id="password" v-model="password" toggleMask placeholder="Ingresa tu contraseña" />
        <small v-if="submitted && !password" class="p-error">La contraseña es obligatoria</small>
      </div>

      <Button label="Iniciar Sesión" type="submit" class="p-mt-2 w-full" />
      <router-link to="/register">
        <Button label="¿No tienes cuenta? Regístrate aquí" class="mt-3 p-button-text" />
      </router-link>
    </form>

    <Message severity="error" v-if="errorMessage" class="p-mt-2">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import  InputText  from 'primevue/inputtext'
import  Password  from 'primevue/password'
import  Button  from 'primevue/button'
import  Message  from 'primevue/message'

const email = ref('')
const password = ref('')
const submitted = ref(false)
const errorMessage = ref('')

const emit = defineEmits(['login'])

const handleLogin = () => {
  submitted.value = true

  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, completa todos los campos.'
    return
  }

  emit('login', { email: email.value, password: password.value })
  errorMessage.value = ''
}
</script>

<style scoped>
.login-form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.p-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: black;
}
h2{
  color: #4da6a0;
}
</style>
