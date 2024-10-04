<script setup>
import { ref } from 'vue'
const account = ref('')
const password = ref('')
const handleLogin = () => {}
</script>

<template>
  <div id="login-container">
    <form @submit="handleLogin">
      <input type="email" placeholder="請輸入email..." v-model="account" required />
      <input type="password" placeholder="請輸入密碼..." v-model="password" required />
      <div id="buttons">
        <button type="submit">提交</button>
        <router-link to="/register"><button>註冊</button></router-link>
      </div>
      <router-link to="/forgot-password">忘記密碼?</router-link>
    </form>
  </div>
</template>
