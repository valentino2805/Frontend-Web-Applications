<template>
    <div class="payments-list">
      <h2>{{ $t('payments.title') }}</h2>
      <div v-for="payment in payments" :key="payment.id" class="payment-card">
        <img :src="payment.clientImage" alt="User" class="avatar" />
        <div class="payment-info">
          <div><strong>{{ $t('payments.paidBy') }}:</strong> {{ payment.clientName }}</div>
          <div><strong>{{ $t('payments.project') }}:</strong> {{ payment.projectName }}</div>
          <div><strong>{{ $t('payments.amount') }}:</strong> ${{ payment.amount }}</div>
          <div><strong>{{ $t('payments.date') }}:</strong> {{ payment.date }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getPaymentsForDesigner } from '../services/payment.service.js'
  
  const payments = ref([])
  
  onMounted(async () => {
    payments.value = await getPaymentsForDesigner()
  })
  </script>
  
  <style scoped>
  .payments-list {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .payment-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    background-color: white;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-right: 1rem;
    object-fit: cover;
    border: 2px solid #00A295;
  }
  
  .payment-info > div {
    margin-bottom: 0.25rem;
    color: #333;
  }
  </style>
  