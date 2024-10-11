<script setup>
import { useCartStore } from '@/stores/store'
import { useRoute } from 'vue-router'
const route = useRoute()
const sessionId = route.query.session_id
const cartStore = useCartStore()
cartStore.checkoutSuccess(sessionId)
</script>
<template>
  <div id="homepage-container">
    <h1 class="checkout-result-title">結帳成功!</h1>
    <section id="to-search">
      <h3>搜尋</h3>
      <p>尋找最喜歡的那一本書</p>
      <div id="pic-and-link">
        <img src="../assets/blonde-1866951_1280.jpg" alt="" />
        <router-link to="/list">連結</router-link>
      </div>
    </section>
  </div>
</template>
