<template>
  <div class="auth-wrapper">

    <div class="fullscreen-overlay"></div>

    <div class="auth-container" :class="{ 'right-panel-active': isRegister }">

      <div class="form-container sign-in-container">
        <LoginForm @login="onLogin" />
      </div>


      <div class="form-container sign-up-container">
        <RegisterForm />
      </div>


      <div class="overlay-container">
        <div class="overlay">


          <video autoplay muted loop playsinline class="overlay-video">
            <source src="/public/forest.mp4" type="video/mp4" />
            {{ t('auth.videoNotSupported') }}
          </video>


          <div class="overlay-panel overlay-left">
            <h1>{{ t('auth.leftPanel.title') }}</h1>
            <p>{{ t('auth.leftPanel.description') }}</p>
            <button class="ghost" @click="isRegister = false">{{ t('auth.leftPanel.button') }}</button>
          </div>


          <div class="overlay-panel overlay-right">
            <h1>{{ t('auth.rightPanel.title') }}</h1>
            <p>{{ t('auth.rightPanel.description') }}</p>
            <button class="ghost" @click="isRegister = true">{{ t('auth.rightPanel.button') }}</button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import LoginForm from '../components/login-form.vue'
import RegisterForm from '../components/register-form.vue'
import { loginUser } from '../services/user-service.js'
import { useUserSession } from '../services/user-session.store.js'

const isRegister = ref(false)
const { t } = useI18n()
const router = useRouter()
const { setUser } = useUserSession()

const onLogin = async (credentials) => {
  const user = await loginUser(credentials.email, credentials.password)
  if (user) {
    setUser(user)
    router.push('/home')
  } else {
    alert(t('auth.loginError'))
  }
}
</script>


<style scoped>

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f4f8;
  padding: 1rem;
}

.auth-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 500px;
  display: flex;
}
.form-container {
  flex: 1;
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  align-items: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}
.sign-in-container {
  left: 0;
  z-index: 2;
}
.sign-up-container {
  left: 0;
  opacity: 0;
  z-index: 1;
  transform: translateX(100%);
}
.auth-container.right-panel-active .sign-up-container {
  transform: translateX(0);
  opacity: 1;
  z-index: 5;
}

.auth-container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.auth-container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(to right, #000000, #000000);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.auth-container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
  left: 0;
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.auth-container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.auth-container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

button.ghost {
  background-color: transparent;
  border: 1px solid #6D3C52;
  color: #6D3C52;
  padding: 10px 25px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
}

button.ghost:hover {
  background-color: #765d67;
  color: white;
}


.overlay-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.6;
  border-radius: 0 10px 10px 0;
}


.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}


.auth-container {
  position: relative;
  z-index: 20;
}


.auth-wrapper {
  position: relative;
  z-index: 15;
}


</style>
