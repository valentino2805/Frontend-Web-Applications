<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ flipped: showBack }">
      <!-- Parte frontal -->
      <div class="flip-card-front" @click="flipCard">
        <img :src="project.image" alt="project image" class="card-image" />
      </div>

      <!-- Parte trasera -->
      <div class="flip-card-back" @click="flipCard">
        <h4>{{ project.title }}</h4>
        <p>{{ project.description || $t('portfolio.defaultDescription') }}</p>
        <div class="card-stats">
          <span>❤️ {{ project.likes }}</span>
          <span>💬 {{ project.comments }}</span>
        </div>
        <button class="edit-btn" @click.stop="openModal">{{ $t('portfolio.edit') }}</button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal-backdrop" v-if="showModal">
    <div class="modal">
      <label>{{ $t('portfolio.title') }}:
        <input v-model="editedProject.title" />
      </label>

      <label>{{ $t('portfolio.description') }}:
        <textarea v-model="editedProject.description" />
      </label>

      <label>
        <div class="image-upload-container">
          <img :src="editedProject.image" class="preview" alt="preview" />
          <!-- Ícono de cámara para subir imagen -->
          <label class="camera-icon">
            <i class="fas fa-camera"></i>
            <input type="file" accept="image/*" @change="onImageUpload" class="upload-input-hidden" />
          </label>
        </div>
      </label>

      <div class="modal-actions">
        <button @click="savePortfolioChanges">{{ $t('portfolio.save') }}</button>
        <button @click="showModal = false">{{ $t('portfolio.cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ project: Object })
const emit = defineEmits(['update-project'])

const showBack = ref(false)
const showModal = ref(false)
const editedProject = ref({ ...props.project })

const flipCard = () => {
  showBack.value = !showBack.value
}

const openModal = () => {
  editedProject.value = JSON.parse(JSON.stringify(props.project))
  showModal.value = true
}

const savePortfolioChanges = () => {
  emit('update-project', editedProject.value)
  showModal.value = false
}

const onImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    editedProject.value.image = reader.result
  }
  reader.readAsDataURL(file)
}
</script>



<style scoped>
.flip-card {
  width: 100%;
  height: 360px; /* más alto */
  perspective: 1000px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.flip-card-front {
  cursor: pointer;
}

.flip-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip-card-back {
  background-color: #f0f0f0;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 16px;
}

.card-stats {
  display: flex;
  gap: 10px;
}

.edit-btn {
  padding: 6px 10px;
  background: #00A295;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* MODAL */
.modal-backdrop {
  position: fixed; /* ⬅️ Esto es clave para cubrir todo */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}


.modal input, .modal textarea {
  width: 100%;
  padding: 8px;
}



.modal-actions {
  display: flex;
  justify-content: space-between;
}

.image-upload-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.camera-icon {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgb(255, 255, 255);
  border-radius: 50%;
  padding: 6px;
  color: #000000;
  cursor: pointer;
}

.upload-input-hidden {
  display: none;
}

</style>
