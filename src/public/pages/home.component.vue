<template>
  <div class="background-stripes flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-8xl font-bold text-white glowing-text animate-fade-in">
      {{ $t('home.welcome') }}
    </h1>
    <p class="text-4xl text-white mt-4 glowing-text animate-slide-up">
      {{ $t('home.to') }}
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<style scoped>

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 2s ease-in-out;
}

/* Layout y estilos */
.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-8xl {
  font-size: 6rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: bold;
}

.mt-4 {
  margin-top: 1rem;
}

/* Fondo con tu paleta */
.background-stripes {
  background: linear-gradient(135deg, #4B2138, #6D3C52, #765d67);
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  position: relative;
  overflow: hidden;
}

.background-stripes::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 20px
  );
  pointer-events: none;
  z-index: 0;
}


@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


</style>
