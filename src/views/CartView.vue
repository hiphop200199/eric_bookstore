<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/store'
const authStore = useAuthStore()
const isLogin = authStore.isLogin
</script>

<template>
  <div id="detail-container">
    <img src="../assets/castle.png" alt="" />
    <section id="info">
      <h1 id="title">Lorem, ipsum.</h1>
      <p>作者</p>
      <p>出版社</p>
      <p>出版日期</p>
      <p>語言</p>
      <p>主題</p>
      <p>庫存數量</p>
      <p>$300</p>
      <section id="buttons">
        <button @click="handlePurchase">直接購買</button>
        <button @click="handleCart">購物車</button>
      </section>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea perspiciatis temporibus quaerat.
        Ab molestias ea quia et sint nemo magni.
      </p>
    </section>
  </div>
</template>
