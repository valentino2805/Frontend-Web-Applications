<template>
  <div class="portfolio-wrapper">
    <button class="add-btn" @click="showAddModal = true">➕ Añadir Proyecto</button>

    <div class="portfolio-grid">
      <PortfolioCard
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
          @update-project="updateProject"
      />
    </div>

    <!-- MODAL AÑADIR PROYECTO -->
    <div class="modal-backdrop" v-if="showAddModal">
      <div class="modal">
        <h2>Añadir nuevo proyecto</h2>

        <label>Título:
          <input v-model="newProject.title" type="text" />
        </label>

        <label>Descripción:
          <textarea v-model="newProject.description"></textarea>
        </label>

        <label>Subir imagen:
          <div class="image-upload">
            <label class="upload-label">
              <i class="fas fa-camera"></i>
              <input type="file" @change="handleImageUpload" accept="image/*" class="upload-hidden" />
            </label>
          </div>
        </label>

        <div class="image-preview" v-if="newProject.image">
          <img :src="newProject.image" alt="Preview" />
        </div>

        <div class="modal-actions">
          <button @click="saveNewProject">Guardar</button>
          <button class="cancel" @click="showAddModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>import { ref, onMounted } from 'vue'
import axios from 'axios'
import PortfolioCard from '../../portfolio/components/portfolio-card.component.vue'
import { getProjects } from '../services/portfolio.service.js'

const projects = ref([])
const showAddModal = ref(false)
const newProject = ref({ title: '', description: '', image: '' })

onMounted(async () => {
  projects.value = await getProjects()
})

const updateProject = async (updatedProject) => {
  const index = projects.value.findIndex(p => p.id === updatedProject.id)
  if (index !== -1) projects.value[index] = updatedProject

  try {
    const { data: profile } = await axios.get('http://localhost:3000/profile')
    profile.projects = profile.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    await axios.put('http://localhost:3000/profile', profile)
  } catch (error) {
    console.error('Error al guardar cambios:', error)
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    newProject.value.image = reader.result
  }
  reader.readAsDataURL(file)
}

const saveNewProject = async () => {
  if (!newProject.value.title || !newProject.value.description || !newProject.value.image) {
    alert('Todos los campos son obligatorios.')
    return
  }

  try {
    const { data: profile } = await axios.get('http://localhost:3000/profile')
    const existingProjects = profile.projects || []
    const maxId = existingProjects.reduce((max, p) => (p.id > max ? p.id : max), 0)
    const newId = maxId + 1

    const randomLikes = Math.floor(Math.random() * 90000 + 1000)
    const randomComments = Math.floor(Math.random() * 15000 + 100)

    const projectToAdd = {
      id: newId,
      title: newProject.value.title,
      description: newProject.value.description,
      image: newProject.value.image,
      likes: randomLikes,
      comments: randomComments
    }

    profile.projects.push(projectToAdd)
    await axios.put('http://localhost:3000/profile', profile)

    projects.value.push(projectToAdd)
    showAddModal.value = false
    newProject.value = { title: '', description: '', image: '' }
  } catch (error) {
    console.error('Error al añadir proyecto:', error)
  }
}

</script>

<style scoped>
.portfolio-wrapper {
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
}

/* Modal básico */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
}

.upload-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}



.image-preview {
  margin: 10px 0;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.add-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #00e5ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}

.modal label {
  display: block;
  margin-top: 15px;
  font-weight: bold;
}

.modal input,
.modal textarea {
  width: 100%;
  margin-top: 6px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-actions .cancel {
  background: #ccc;
}

.modal-actions button:first-child {
  background: #2ecc71;
  color: white;
}

.image-upload {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.upload-label {
  cursor: pointer;
  font-size: 24px;
  color: #2c3e50;
}

.upload-hidden {
  display: none;
}

.image-preview {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
}

</style>

