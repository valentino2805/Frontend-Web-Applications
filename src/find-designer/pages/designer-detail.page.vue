<template>
    <designer-detail-modal :designerId="designerId" />
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import DesignerDetailModal from '../components/designer-detail-modal.component.vue'
  
  const route = useRoute()
  const designerId = route.params.id
  </script>
  