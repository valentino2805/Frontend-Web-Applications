<template>
    <div class="balance-box" @click="goToPayments">
      <i class="pi pi-wallet"></i>
      <span class="amount">${{ balance }}</span>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  
  const router = useRouter()
  const balance = ref(340) // saldo dummy
  
  const goToPayments = () => {
    router.push('/client/payments')
  }
  </script>
  
  <style scoped>
  .balance-box {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
    font-weight: 600;
    color: #00A295;
    transition: background 0.2s;
  }
  .balance-box:hover {
    background-color: #f0fdfc;
  }
  .amount {
    margin-left: 0.5rem;
  }
  </style>
  