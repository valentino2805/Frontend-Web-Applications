<template>
    <div class="modal-overlay">
      <div class="modal-container">
        <button class="close-btn" @click="closeModal">×</button>
  
        <div class="carousel">
          <button class="nav-btn left" @click="prev"><i class="pi pi-chevron-left"></i></button>
  
          <div class="content">
            <img :src="currentDesign.image" alt="design" class="design-img" />
            <div class="info-panel">
              <div class="designer-header">
                <img :src="designer.profileImage" class="avatar" />
                <div class="name-rating">
                  <h3>{{ currentDesign.title }}</h3>
                  <p>{{ designer.name }}</p>
                  <p>
                    <i class="pi pi-star" v-for="n in currentDesign.rating" :key="n" style="color: gold" />
                  </p>
                </div>
                <button class="profile-btn">{{ $t('findDesigner.viewProfile') }}</button>
              </div>
  
              <div class="comments">
                <h4>{{ $t('findDesigner.comments') }}</h4>
                <div v-for="(c, idx) in currentDesign.comments" :key="idx" class="comment">
                  <p><strong>{{ c.user }}</strong>: {{ c.text }}</p>
                </div>
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
  import { getDesignerDetailById } from '../service/designer.service.js'
  
  const props = defineProps({ designerId: String })
  const router = useRouter()
  
  const designer = ref({})
  const index = ref(0)
  
  const currentDesign = computed(() => designer.value.designs?.[index.value] || {})
  
  const closeModal = () => {
    router.push('/find-designer') // o vuelve a la categoría anterior si lo deseas
  }
  
  const next = () => {
    if (index.value < designer.value.designs.length - 1) index.value++
  }
  const prev = () => {
    if (index.value > 0) index.value--
  }
  
  onMounted(async () => {
    designer.value = await getDesignerDetailById(props.designerId)
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    position: relative;
    width: 90%;
    max-width: 1100px;
    background: white;
    border-radius: 16px;
    padding: 2rem;
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #eee;
    border: none;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    font-size: 1.4rem;
    cursor: pointer;
    font-weight: bold;
    color: #333;
  }
  
  .carousel {
    display: flex;
    align-items: center;
  }
  
  .nav-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #00A295;
  }
  
  .nav-btn.left {
    margin-right: 1rem;
  }
  .nav-btn.right {
    margin-left: 1rem;
  }
  
  .content {
    display: flex;
    gap: 2rem;
    flex-grow: 1;
  }
  
  .design-img {
    width: 420px;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
  
  .info-panel {
    flex: 1;
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
  }
  
  .name-rating h3 {
    margin: 0;
    color: #00A295;
  }
  .name-rating p {
    margin: 0;
    font-size: 0.9rem;
  }
  
  .profile-btn {
    margin-left: auto;
    background: #00A295;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .comments {
    margin-top: 1.5rem;
  }
  .comment {
    margin-bottom: 0.5rem;
  }
  *{
  color: #222;
}
  </style>
  