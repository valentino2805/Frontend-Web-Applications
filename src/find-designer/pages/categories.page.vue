<template>
  <div class="card-container">
    <div
        class="hover-card"
        v-for="category in categories"
        :key="category.key"
        :class="`hover-card--${category.key}`"
        @click="goToCategory(category.key)"
    >
      <img :src="category.image" :alt="$t(category.label)" class="card-img" />

      <div class="card-info-left">
        <h2>{{ $t(category.label) }}</h2>
      </div>

      <div class="card-info-right">
        <h2>{{ $t(category.label) }}</h2>
        <p>{{ $t(`findDesigner.description.${category.key}`) }}</p>
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
    image: 'https://fd.ort.edu.uy/innovaportal/file/154895/1/que-es-ser-disenador-industrial-universidad-ort-uruguay-conoce-la-carrera.jpg'
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
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: #0d0d0d;
  min-height: 100vh;
  justify-content: center;
}

.hover-card {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.hover-card:hover {
  transform: scale(1.05);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 0.5s ease;
}

.hover-card:hover .card-img {
  filter: grayscale(0);
}

.card-info-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  padding: 1.2rem;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  transition: opacity 0.3s ease;
}

.hover-card:hover .card-info-left {
  opacity: 0;
}

.card-info-left h2 {
  font-size: 1.7rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 1px 1px 2px #000;
}

.card-info-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -100%;
  width: 60%;
  padding: 1.2rem;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  z-index: 3;
  transition: right 0.4s ease;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.hover-card:hover .card-info-right {
  right: 0;
}

.card-info-right h2 {
  margin: 0;
  font-size: 1.6rem;
  text-shadow: 1px 1px 2px #000;
}

.card-info-right p {
  margin-top: 0.5rem;
  font-size: 0.95rem;
}

/* 🎨 Colores por categoría */
.hover-card--graphic .card-info-right {
  background: rgba(186, 85, 211, 0.6); /* violeta */
}

.hover-card--interior .card-info-right {
  background: rgba(70, 130, 180, 0.6); /* azul acero */
}

.hover-card--industrial .card-info-right {
  background: rgba(255, 140, 0, 0.6); /* naranja oscuro */
}

.hover-card--fashion .card-info-right {
  background: rgba(255, 105, 180, 0.6); /* rosa */
}
</style>
