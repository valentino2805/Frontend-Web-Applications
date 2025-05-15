<template>
    <div class="categories-page">
      <h2>{{ $t('findDesigner.title') }}</h2>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.key" class="category-card" @click="goToCategory(category.key)">
          <img :src="category.image" :alt="category.label" />
          <div class="label">{{ $t(category.label) }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const categories = [
    {
      key: 'graphic',
      label: 'findDesigner.categories.graphic',
      image: 'https://barreira.edu.es/wp-content/uploads/salidas-grado-diseno-grafico.jpg'
    },
    {
      key: 'interior',
      label: 'findDesigner.categories.interior',
      image: 'https://www.bysincro.com/wp-content/uploads/2019/09/interioristas-sincro.jpg'
    },
    {
      key: 'industrial',
      label: 'findDesigner.categories.industrial',
      image: 'https://guiauniversitaria.mx/wp-content/uploads/2020/06/%C2%BFQu%C3%A9-es-y-qu%C3%A9-hace-un-dise%C3%B1ador-industrial_.jpg'
    },
    {
      key: 'fashion',
      label: 'findDesigner.categories.fashion',
      image: 'https://www.chio-lecca.edu.pe/cdn/shop/articles/chio-lecca-blog-funciones-de-un-disenador-de-modas.jpg?v=1684520444'
    }
  ]
  
  const goToCategory = (key) => {
    router.push(`/find-designer/${key}`)
  }
  </script>
  
  <style scoped>
  .categories-page {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  h2 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: #222;
    text-align: center;
  }
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .category-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    background-color: white;
    transition: transform 0.2s;
  }
  
  .category-card:hover {
    transform: scale(1.02);
  }
  
  .category-card img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
  
  .label {
    text-align: center;
    padding: 0.75rem;
    font-weight: 600;
    color: #00A295;
  }
  </style>
  