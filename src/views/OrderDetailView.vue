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
  <div id="order-detail-container"></div>
</template>
