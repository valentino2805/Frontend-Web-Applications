<template>
    <div>
      <div v-for="payment in payments" :key="payment.id" class="payment-card">
        <div class="info">
          <div><strong>{{ $t('payments.paidTo') }}:</strong> {{ payment.clientName }}</div>
          <div><strong>{{ $t('payments.project') }}:</strong> {{ payment.projectName }}</div>
          <div><strong>{{ $t('payments.amount') }}:</strong> ${{ payment.amount }}</div>
          <div><strong>{{ $t('payments.date') }}:</strong> {{ payment.date }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getPaymentsForClient } from '../services/payment.service.js'
  
  const payments = ref([])
  
  onMounted(async () => {
    payments.value = await getPaymentsForClient()
  })
  </script>
  
  <style scoped>
  .payment-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }
  h2, .balance-box, .payment-card, .payment-info > div {
  color: #222;
    }

  </style>
  