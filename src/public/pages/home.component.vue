<template>
  <div>
    <!-- Botones para cambiar el idioma -->
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('es')">Español</button>

    <div class="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <h1 class="text-8xl font-bold text-white animate-fade-in">{{ $t('home.welcome') }}</h1>
      <p class="text-4xl text-white mt-4 animate-slide-up">{{ $t('home.to') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang;  // Cambiar el idioma a 'en' o 'es'
};
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

.bg-white {
  background-color: white;
}

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

/* Títulos con sombra sutil para un toque futurista */
.text-8xl {
  font-size: 6rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* Sombra sutil */
}

.text-4xl {
  font-size: 2.25rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* Sombra sutil */
}

.font-bold {
  font-weight: bold;
}

.text-black {
  color: black;
}

/* Efecto de sombra en el botón para hacerlo más llamativo */
.p-button-raised {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidad */
  transition: all 0.3s ease; /* Suave transición para el hover */
}

.p-button-raised:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Aumento de sombra al hacer hover */
  transform: translateY(-2px); /* Sutil efecto de elevación */
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}
</style>