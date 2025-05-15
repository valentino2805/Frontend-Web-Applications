<template>
    <div class="category-results-page">
      <h2>{{ $t(`findDesigner.categories.${category}`) }}</h2>
  
      <div class="designer-list">
        <designer-card
          v-for="designer in designers"
          :key="designer.id"
          :designer="designer"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getDesignersByCategory } from '../service/designer.service.js'
  import DesignerCard from '../components/designer-card.component.vue'
  
  const route = useRoute()
  const category = route.params.category
  const designers = ref([])
  
  onMounted(async () => {
    designers.value = await getDesignersByCategory(category)
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
  