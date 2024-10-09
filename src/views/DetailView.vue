<script setup>
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { useCartStore, useProductStore } from '@/stores/store'
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const product = computed(() => productStore.product)
const bookId = route.params.id

const handlePurchase = () => {}
const handleCart = (id) => {
  cartStore.addItem(id)
}
const getProduct = (id) => {
  productStore.getProduct(id)
}
getProduct(bookId)
</script>

<template>
  <div id="detail-container">
    <loading-animation v-if="productStore.isLoading"></loading-animation>
    <img :src="product.image_source" alt="" v-if="!productStore.isLoading" />
    <section id="info" v-if="!productStore.isLoading">
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
      <p>價格:${{ product.price }}元</p>
      <section id="buttons">
        <button @click="handlePurchase" :disabled="product.stock == 0">直接購買</button>
        <button @click="handleCart(bookId)" :disabled="product.stock == 0">加入購物車</button>
      </section>
      <p>
        {{ product.introduction }}
      </p>
    </section>
  </div>
</template>
