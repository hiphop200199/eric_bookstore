<script setup>
import { useAuthStore } from '@/stores/store'
import { computed, onMounted, ref } from 'vue'
const authStore = useAuthStore()
const account = ref('')
const password = ref('')
const password_confirmation = ref('')
const name = ref('')
const tel = ref('')
const address = ref('')
const message = ref(null)
const isLogin = computed(() => authStore.isLogin)
const handleRegister = ($event) => {
  $event.preventDefault()
  if (password_confirmation.value !== password.value) {
    message.value.innerText = '密碼不一致'
    message.value.classList.add('is-error')
    return false
  } else {
    message.value.classList.remove('is-error')
    message.value.innerText = ''
    authStore.handleRegister(
      name.value,
      account.value,
      password.value,
      password_confirmation.value,
      tel.value,
      address.value
    )
  }
}
</script>

<template>
  <div id="register-container">
    <form @submit="handleRegister">
      <input type="text" placeholder="請輸入姓名..." v-model="name" required maxlength="255" />
      <input type="email" placeholder="請輸入email..." v-model="account" required maxlength="255" />
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
      <input type="tel" v-model="tel" required placeholder="請輸入電話..." />
      <input type="text" v-model="address" required placeholder="請輸入送貨地址..." />
      <p id="message" ref="message"></p>
      <div id="buttons">
        <button type="submit">註冊</button>
      </div>
    </form>
  </div>
</template>
