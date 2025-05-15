<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()

const email = ref('')
const password = ref('')
const submitted = ref(false)
const internalError = ref('')

const emit = defineEmits(['login'])

const props = defineProps({
  errorMessage: String
})

watch(() => props.errorMessage, (newVal) => {
  internalError.value = newVal
})

const handleLogin = () => {
  submitted.value = true

  if (!email.value || !password.value) {
    internalError.value = t('login.errors.requiredFields')
    return
  }

  internalError.value = ''
  emit('login', { email: email.value, password: password.value })
}
</script>

<template>
  <div class="login-form-wrapper">
    <div class="login-form-card">
      <h2 class="title">{{ t('login.title') }}</h2>

      <Message
          severity="error"
          v-if="internalError"
          class="mb-3"
          :closable="true"
          icon="pi pi-exclamation-triangle"
      >
        {{ internalError }}
      </Message>

      <form @submit.prevent="handleLogin" class="form">
        <div class="p-field mb-3">
          <label for="email">{{ t('login.emailLabel') }}</label>
          <InputText
              id="email"
              v-model="email"
              type="email"
              :placeholder="t('login.emailPlaceholder')"
              class="w-full"
          />
          <small v-if="submitted && !email" class="p-error">
            {{ t('login.errors.emailRequired') }}
          </small>
        </div>

        <div class="p-field mb-3">
          <label for="password">{{ t('login.passwordLabel') }}</label>
          <Password
              id="password"
              v-model="password"
              toggleMask
              :placeholder="t('login.passwordPlaceholder')"
              class="w-full"
          />
          <small v-if="submitted && !password" class="p-error">
            {{ t('login.errors.passwordRequired') }}
          </small>
        </div>

        <Button :label="t('login.button')" type="submit" class="w-full mb-2" />
        <router-link to="/register">
          <Button :label="t('login.registerLink')" class="p-button-text w-full" />
        </router-link>
      </form>
    </div>
  </div>
</template>


<style scoped>
.login-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9f9f9;
  font-family: 'Inter', sans-serif;
}

.login-form-card {
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #4da6a0;
  font-weight: 600;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  color: #333;
}

.p-error {
  font-size: 0.75rem;
}
</style>
