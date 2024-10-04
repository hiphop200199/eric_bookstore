<script setup>
import { ref } from 'vue'
const account = ref('')
const handleForgotPassword = () => {}
</script>

<template>
  <div id="forgot-password-container">
    <form @submit="handleForgotPassword">
      <input
        type="email"
        name=""
        id=""
        placeholder="請輸入註冊email..."
        v-model="account"
        required
      />
      <div id="buttons">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>
