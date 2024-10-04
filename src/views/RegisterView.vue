<script setup>
import { ref } from 'vue'
const account = ref('')
const password = ref('')
const password_confirmation = ref('')
const name = ref('')
const phone = ref('')
const address = ref('')
const handleRegister = () => {}
</script>

<template>
  <div id="register-container">
    <form @submit="handleRegister">
      <input type="text" placeholder="請輸入姓名..." v-model="name" required />
      <input type="email" placeholder="請輸入email..." v-model="account" required />
      <input
        type="password"
        placeholder="請輸入密碼..."
        v-model="password"
        required
        minlength="8"
      />
      <input
        type="password"
        placeholder="請確認密碼..."
        v-model="password_confirmation"
        required
        minlength="8"
      />
      <input type="tel" placeholder="電話(選填)" v-model="phone" />
      <input type="text" placeholder="地址(選填)" v-model="address" />
      <div id="buttons">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>
