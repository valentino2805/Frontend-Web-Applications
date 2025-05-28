<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProfileCard from '../components/profile-card.component.vue';

const route = useRoute();
const profile = ref(null);


onMounted(async () => {
  try {
    const profileId = route.params.profileId;
    profile.value = await getProfileById(profileId);
  } catch (err) {
    console.error('Error cargando perfil:', err);
  }
});


const getProfileById = async (profileId) => {

  const response = await fetch(`https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/profiles?id=${profileId}`);
  const data = await response.json();
  return data[0];
};
</script>

<template>
  <section class="profile-page">
    <ProfileCard v-if="profile" :profile="profile" />
    <p v-else>Cargando perfil...</p>
  </section>
</template>

<style scoped>
.profile-page {
  padding: 2rem;
}
</style>
