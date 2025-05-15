<template>
    <div class="client-payments-page">
      <h2>{{ $t('payments.title') }}</h2>
  
      <div class="balance-box">
        <i class="pi pi-wallet"></i>
        <span>${{ balance }}</span>
        <i class="pi pi-plus-circle reload-icon" @click="showModal = true" :title="$t('payments.reload')"></i>
      </div>
  
      <client-payments-list />
  
      <client-payment-modal v-if="showModal" @close="showModal = false" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ClientPaymentsList from '../components/client-payments-list.component.vue'
  import ClientPaymentModal from '../components/client-payment-modal.component.vue'
  
  const balance = ref(340)
  const showModal = ref(false)
  </script>
  
  <style scoped>
  .client-payments-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .balance-box {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #00A295;
  }

  .reload-icon {
  font-size: 1.4rem;
  margin-left: 1rem;
  cursor: pointer;
  color: #00A295;
  transition: transform 0.2s, color 0.2s;
}

.reload-icon:hover {
  color: #007366;
  transform: scale(1.1);
}

  h2, .balance-box, .payment-card, .payment-info > div {
  color: #222;
    }

  </style>
  