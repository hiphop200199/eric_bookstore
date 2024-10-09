<script setup>
import { useAuthStore, useProductStore } from '@/stores/store'
import router from '@/router'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
const authStore = useAuthStore()
const isEditing = ref(false)
authStore.getUser()
</script>

<template>
  <div id="member-container">
    <h1>會員資料</h1>
    <loading-animation v-if="authStore.isLoading"></loading-animation>
    <section id="info" v-else>
      <button>編輯</button>
      <label for=""
        >姓名：<input type="text" v-model="authStore.user.name" name="" id="" disabled
      /></label>
      <label for=""
        >信箱：<input type="email" v-model="authStore.user.email" name="" id="" disabled
      /></label>
      <label for=""
        >電話：<input type="tel" v-model="authStore.user.phone" name="" id="" disabled
      /></label>
      <label for=""
        >地址：<input type="text" v-model="authStore.user.address" name="" id="" disabled
      /></label>
      <button v-if="isEditing">確認</button>
      <section id="links">
        <router-link to="/order">訂單資料</router-link>
        <router-link>重設密碼</router-link>
      </section>
    </section>
  </div>
</template>
