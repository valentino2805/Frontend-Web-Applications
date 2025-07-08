<template>
  <div class="form-container">
    <h2 style="color: black;">Register</h2>
    <form @submit.prevent="handleRegister">

      <div class="field">
        <label for="email">{{ t('register.emailLabel') }}</label>
        <InputText id="email" v-model="user.email" :class="{'p-invalid': submitted && !validEmail(user.email)}" />
        <small v-if="submitted && !validEmail(user.email)" class="p-error">{{ t('register.errors.invalidEmail') }}</small>
      </div>


      <div class="field">
        <label for="password">{{ t('register.passwordLabel') }}</label>
        <Password
            id="password"
            v-model="user.password"
            toggleMask
            :feedback="false"
            :class="{'p-invalid': submitted && !user.password}"
        />
        <small v-if="submitted && !user.password" class="p-error">{{ t('register.errors.passwordRequired') }}</small>
      </div>


      <div class="field">
        <label for="role">{{ t('register.roleLabel') || 'Rol' }}</label>
        <select id="role" v-model="user.role" required :class="{'p-invalid': submitted && !user.role}">
          <option disabled value="">{{ t('register.selectRole') || 'Selecciona un rol' }}</option>
          <option value="profile">{{ t('register.roles.profile') || 'Perfil (Diseñador)' }}</option>
          <option value="client">{{ t('register.roles.client') || 'Client' }}</option>
        </select>
        <small v-if="submitted && !user.role" class="p-error">Selecciona un rol</small>
      </div>


      <Button :label="t('register.button')" type="submit" class="register-button mt-3" />
      <Message v-if="success" severity="success" class="mt-3">
        {{ t('register.successMessage') }}
      </Message>
      <Message v-if="errorMessage" severity="error" class="mt-3">
        {{ errorMessage }}
      </Message>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { authService } from '../services/auth.service.js'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()
const router = useRouter()

const user = ref({
  email: '',
  password: '',
  role: ''
})

const submitted = ref(false)
const success = ref(false)
const errorMessage = ref('')

function validEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

async function handleRegister() {
  submitted.value = true
  errorMessage.value = ''

  if (validEmail(user.value.email) && user.value.password) {
    try {
      await authService.register(user.value)
      success.value = true
      submitted.value = false
      user.value = { email: '', password: '', role: '' }
      setTimeout(() => router.push('/login'), 1500)
    } catch (error) {
      errorMessage.value = error.message || t('register.errors.registrationFailed')
    }
  }
}
</script>



<style scoped>
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5"><polygon points="0,0 10,0 5,5" fill="%23333"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 5px;
}

select:focus {
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.4);
  outline: none;
}

select:disabled {
  background-color: #f5f5f5;
  color: #aaa;
}

.p-invalid {
  border-color: #e74c3c !important;
}

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
  color: #000000;
}
label{
  color: black;
  padding-right: 50px;
}

.register-button {
  border-radius: 25px !important;
  background-color: #765d67 !important;
  color: #000000 !important;
  border: none !important;
  padding: 0.5rem 2.5rem !important;
  font-weight: bold;
}
.register-button:hover {
  background-color: #4B2138 !important;
  color: #000000 !important;
  border: none !important;
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem 1rem;
    max-width: 100%;
    box-shadow: none;
    border-radius: 0;
  }

  h2 {
    font-size: 1.8rem;
    text-align: center;
  }

  label {
    padding-right: 0;
    font-size: 1rem;
  }

  select,
  input,
  .p-password {
    font-size: 1rem;
    padding: 0.75rem 10px;
  }

  .register-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.1rem;
  }
}

</style>
