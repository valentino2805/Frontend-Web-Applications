<template>
  <div class="register-page">
    <register-form />
  </div>
</template>

<script setup>
import RegisterForm from '../components/register-form.vue'
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f7f7f7;
  min-height: 100vh;
}
</style>
