<script setup>
import { useAuthStore, useProductStore } from '@/stores/store'
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const productStore = useProductStore()
const route = useRoute()
const isLogin = authStore.isLogin
const product = computed(() => productStore.product)
let bookId = route.params.id

const handlePurchase = () => {
  isLogin === true ? router.push({ path: '/cart' }) : router.push({ path: '/login' })
}
const handleCart = () => {
  isLogin === true ? router.push({ path: '/list' }) : router.push({ path: '/login' })
}
const getProduct = (id) => {
  productStore.getProduct(id)
}
getProduct(bookId)
</script>

<template>
  <div id="detail-container">
    <img :src="product.image_source" alt="" />
    <section id="info">
      <h1 id="title">{{ product.name }}</h1>
      <p>作者:{{ product.author }}</p>
      <p>出版社:{{ product.publisher }}</p>
      <p>出版日期:{{ product.published_date }}</p>
      <p>語言:{{ product.language }}</p>
      <p>主題:{{ product.theme }}</p>
      <p>
        庫存數量:<span id="stock" :class="product.stock == 0 ? 'empty' : ''">{{
          product.stock
        }}</span>
      </p>
      <p>價格:${{ product.price }}</p>
      <section id="buttons">
        <button @click="handlePurchase" :disabled="product.stock == 0">直接購買</button>
        <button @click="handleCart" :disabled="product.stock == 0">購物車</button>
      </section>
      <p>
        {{ product.introduction }}
      </p>
    </section>
  </div>
</template>
