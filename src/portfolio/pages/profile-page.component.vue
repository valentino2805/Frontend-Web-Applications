<script setup>
import { ref, onMounted } from 'vue';
import { getProfile } from '../services/profile.service';
import ProfileCard from '../components/profile-card.component.vue';

const profile = ref(null);

onMounted(async () => {
  profile.value = await getProfile();
});
</script>

<template>
  <section class="profile-page">
    <ProfileCard v-if="profile" :profile="profile" />
  </section>
</template>

<style scoped>
.profile-page {
  padding: 2rem;
}

</style>
