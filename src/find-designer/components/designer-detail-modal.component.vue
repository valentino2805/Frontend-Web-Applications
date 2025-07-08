<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <button class="close-btn" @click="closeModal">×</button>

      <div class="carousel">
        <button class="nav-btn left" @click="prev"><i class="pi pi-chevron-left"></i></button>

        <div class="content" v-if="projects.length">
          <img :src="currentProject.image" alt="project" class="design-img" />
          <div class="info-panel">
            <div class="designer-header">
              <img :src="designer.profileImage" class="avatar" />
              <div class="name-rating">
                <h3>{{ currentProject.title }}</h3>
                <p>{{ designer.name }}</p>
                <p class="tags">Tecnologías: {{ currentProject.technologies?.join(', ') }}</p>
                <p class="meta">Likes: {{ currentProject.likes }} | Comentarios: {{ currentProject.comments }}</p>
              </div>
              <button class="profile-btn" @click="goToProfile">{{ $t('findDesigner.viewProfile') }}</button>
            </div>

            <div class="comments">
              <h4>{{ $t('findDesigner.comments') }}</h4>
              <input type="text" placeholder="Escribe un comentario..." />
            </div>
          </div>
        </div>

        <button class="nav-btn right" @click="next"><i class="pi pi-chevron-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({ designerId: String })
const router = useRouter()

const designer = ref({})
const projects = ref([])
const index = ref(0)

const currentProject = computed(() => projects.value[index.value] || {})

const closeModal = () => {
  router.back()

}

const next = () => {
  if (index.value < projects.value.length - 1) index.value++
}
const prev = () => {
  if (index.value > 0) index.value--
}

const goToProfile = () => {
  router.push({ name: 'profile', params: { profileId: props.designerId } })
}

onMounted(async () => {
  try {
    const profileRes = await axios.get(`https://creatilink-api-production-d54e.up.railway.app/api/v1/profiles`)
    const allProfiles = profileRes.data
    const found = allProfiles.find(p => String(p.userId) === props.designerId)
    if (found) {
      designer.value = {
        name: found.name,
        profileImage: found.image,
        profileId: found.id
      }

      const projectRes = await axios.get(`https://creatilink-api-production-d54e.up.railway.app/api/v1/projects`)
      projects.value = projectRes.data.filter(p => p.profileId === found.id)
    }
  } catch (error) {
    console.error('Error al cargar diseñador o proyectos:', error)
  }
})
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f2f2f2;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}
.close-btn:hover {
  background: #ddd;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border: none;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  color: #00A295;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: all 0.2s ease;
  padding: 0;
  cursor: pointer;
}

.nav-btn:hover {
  background-color: #00A295;
  color: white;
  transform: scale(1.1);
}


.nav-btn.left {
  margin-right: 1.5rem;
}
.nav-btn.right {
  margin-left: 1.5rem;
}

.content {
  display: flex;
  flex-grow: 1;
  gap: 2rem;
  align-items: flex-start;
  max-width: 900px;
}

.design-img {
  width: 420px;
  height: 300px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.info-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.designer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00a295;
}

.name-rating h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #00a295;
}
.name-rating p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #444;
}
.tags, .meta {
  font-size: 0.85rem;
  color: #666;
}

.profile-btn {
  margin-left: auto;
  background: #00a295;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}
.profile-btn:hover {
  background: #008975;
}

.comments {
  margin-top: 2rem;
}
.comments h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.comments input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}
.comments input:focus {
  border-color: #00a295;
}



  </style>
