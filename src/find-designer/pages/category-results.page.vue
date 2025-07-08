<template>
  <div class="category-results-page">
    <h2>{{ $t('findDesigner.title') }}</h2>

    <div class="designer-list">
      <designer-card
          v-for="profile in filteredProfiles"
          :key="profile.id"
          :designer="profile"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { authService } from '../../users/services/auth.service.js'
import axios from 'axios'
import DesignerCard from '../components/designer-card.component.vue'

const API_URL_PROFILES = 'https://creatilink-api-production-d54e.up.railway.app/api/v1/profiles'

const allUsers = ref([])
const profiles = ref([])
const currentUser = ref(null)

onMounted(async () => {
  try {
    allUsers.value = await authService.getAllUsers()
    currentUser.value = authService.getCurrentUser()

    const profileRes = await axios.get(API_URL_PROFILES)
    profiles.value = profileRes.data
  } catch (err) {
    console.error('Error al cargar datos:', err)
  }
})

// solo diseñadores con perfil y role 'profile', y que no sean el actual
const filteredProfiles = computed(() => {
  return profiles.value.filter(profile => {
    const user = allUsers.value.find(u => u.id === profile.userId)
    return user?.role === 'profile' && user.id !== currentUser.value?.id
  })
})
</script>

<style scoped>
.category-results-page {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  color: #00A295;
  font-size: 1.6rem;
}

.designer-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
