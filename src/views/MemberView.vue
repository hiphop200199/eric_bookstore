<script setup>
import { useAuthStore, useProductStore } from '@/stores/store'
import router from '@/router'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const isEditing = ref(false)
</script>

<template>
  <div id="member-container">
    <h1>會員資料</h1>
    <section id="info">
      <button>編輯</button>
      <label for="">姓名：<input type="text" name="" id="" disabled /></label>
      <label for="">信箱：<input type="email" name="" id="" disabled /></label>
      <label for="">電話：<input type="tel" name="" id="" disabled /></label>
      <label for="">地址：<input type="text" name="" id="" disabled /></label>
      <button v-if="isEditing">確認</button>
      <section id="links">
        <router-link to="/order">訂單資料</router-link>
        <router-link>重設密碼</router-link>
      </section>
    </section>
  </div>
</template>
