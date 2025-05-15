<template>
    <div class="card" @click="goToDetail">
      <img :src="designer.photo" alt="profile" class="photo" />
      <div class="info">
        <h3>{{ designer.name }}</h3>
        <p><i class="pi pi-map-marker"></i> {{ $t('findDesigner.location') }}: {{ designer.location }}</p>
        <p><i class="pi pi-briefcase"></i> {{ $t('findDesigner.experience') }}: {{ designer.experience }}</p>
        <p><i class="pi pi-star"></i> {{ $t('findDesigner.rating') }}: {{ designer.rating }}</p>
        <p>{{ $t('findDesigner.description') }}: {{ designer.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const props = defineProps({ designer: Object })
  const router = useRouter()
  
  const goToDetail = () => {
    router.push(`/find-designer/${props.designer.category}/${props.designer.id}`)
  }
  </script>
  
  <style scoped>
  .card {
    display: flex;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s;
    cursor: pointer;
  }
  
  .card:hover {
    transform: scale(1.01);
  }
  
  .photo {
    width: 140px;
    height: 100%;
    object-fit: cover;
    border-right: 1px solid #eee;
  }
  
  .info {
    padding: 1rem;
    flex-grow: 1;
    color: #333;
  }
  
  .info h3 {
    margin: 0 0 0.5rem 0;
    color: #00A295;
  }
  
  .info p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
  }
  </style>
  