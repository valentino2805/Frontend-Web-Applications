<template>
  <div class="dashboard">
    <h1 class="title">What do we do today?</h1>


    <!-- Top row (3 options) -->
    <div class="options-row">
      <div
          v-for="option in topOptions"
          :key="option.title"
          class="option"
          @click="goTo(option.path)"
      >
        <div class="icon-circle">
          <img :src="option.icon" :alt="option.title" class="icon" />
        </div>
        <p class="option-title">{{ option.title }}</p>
      </div>
    </div>

    <!-- Bottom row (2 options centered) -->
    <div class="options-row bottom-row">
      <div
          v-for="option in bottomOptions"
          :key="option.title"
          class="option"
          @click="goTo(option.path)"
      >
        <div class="icon-circle">
          <img :src="option.icon" :alt="option.title" class="icon" />
        </div>
        <p class="option-title">{{ option.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const topOptions = [
  { title: 'Search Designers', icon: '/designer.png', path: '/designers' },
  { title: 'View Portfolio', icon: '/jobs.png', path: '/portfolio' },
  { title: 'View my payments', icon: '/payments.png', path: '/payments' },
];

const bottomOptions = [
  { title: 'View my reviews', icon: '/reviews.png', path: '/reviews' },
  { title: 'View my chats', icon: '/chats.png', path: '/chats' },
];

const goTo = (path) => {
  router.push(path);
};
</script>
<style scoped>
.dashboard {
  min-height: 100vh;

  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.search-container {
  margin-bottom: 3rem;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.options-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.bottom-row {
  margin-top: -1rem; /* Superposición leve con fila superior */
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.option:hover {
  transform: scale(1.05);
}

.icon-circle {
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.option-title {
  margin-top: 1rem;
  color: white;
  font-weight: 500;
  text-align: center;
}

</style>
