<script setup>
import { useCartStore } from '@/stores/store'

const cartStore = useCartStore()
const adjustAmount = () => {
  cartStore.adjustAmount()
}
const removeItem = () => {
  cartStore.removeItem()
}
cartStore.getItems()
</script>

<template>
  <div id="cart-container">
    <h1 id="list">購物車清單</h1>
    <div class="product-box">
      <div class="product-card" v-for="(item, index) in cartStore.items" :key="index" :id="item.id">
        <img class="product-cover" :src="item.image_source" alt="" />
        <p class="product-title">{{ item.name }}</p>
        <p class="product-price">${{ item.price }}元</p>
        <label for="amount"
          >數量:<input
            type="number"
            id="amount"
            min="1"
            :value="item.amount"
            @change="adjustAmount"
        /></label>
        <button class="remove" @click="removeItem">移除</button>
      </div>
    </div>
    <h1 id="total" v-if="!cartStore.isLoading">總金額:{{ cartStore.total }}元</h1>
    <h1>收件人資訊</h1>
    <section id="info">
      <label for="">姓名：<input type="text" name="" id="" /></label>
      <label for="">電話：<input type="tel" name="" id="" /></label>
      <label for="">地址：<input type="text" name="" id="" /></label>
    </section>
    <div id="checkout-box">
      <button id="checkout">結帳</button>
    </div>
  </div>
</template>
