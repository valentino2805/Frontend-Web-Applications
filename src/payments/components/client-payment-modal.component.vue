<template>
    <div class="overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ $t('payments.methods.title') }}</h3>
          <button class="close-btn" @click="$emit('close')">×</button>
        </div>
        <ul class="methods-list">
          <li v-for="method in methods" :key="method.key" @click="selectMethod(method.key)">
            <img :src="method.icon" alt="" />
            <span>{{ $t(`payments.methods.${method.key}`) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const methods = [
    { key: 'plin', icon: 'https://logosenvector.com/logo/img/plin-interbank-4391.png' },
    { key: 'yape', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png' },
    { key: 'cash', icon: 'https://cdn.worldvectorlogo.com/logos/pago-efectivo-2020.svg' },
    { key: 'visa', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
    { key: 'mastercard', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { key: 'paypal', icon: 'https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-3-1.png' },
    { key: 'applepay', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png' },
    { key: 'googlepay', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1024px-Google_Pay_Logo.svg.png' }
  ]
  
  const selectMethod = (method) => {
    alert(`Simulación de pago con: ${method}`)
  }
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 360px;
    max-width: 95%;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .close-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  color: black; 
}

  
  .methods-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .methods-list li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .methods-list li:hover {
    background-color: #f0f0f0;
  }
  
  .methods-list img {
    height: 28px;
    width: 28px;
    object-fit: contain;
    margin-right: 0.8rem;
  }
  h3,span{
  color: #222;
}

  </style>
  