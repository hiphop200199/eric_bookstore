<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/store'
const authStore = useAuthStore()
const isLogin = authStore.isLogin
</script>

<template>
  <div id="cart-container">
    <h1 id="list">購物車清單</h1>
    <div class="product-box">
      <div class="product-card">
        <img class="product-cover" src="../assets/man-1690965_640.jpg" alt="" />
        <p class="product-title">123</p>
        <p class="product-price">$111</p>
        <label for="amount">數量:<input type="number" name="" id="amount" min="1" /></label>
        <button class="remove">移除</button>
      </div>
      <div class="product-card">
        <img class="product-cover" src="../assets/man-1690965_640.jpg" alt="" />
        <p class="product-title">123</p>
        <p class="product-price">$111</p>
        <label for="amount">數量:<input type="number" name="" id="amount" min="1" /></label>
        <button class="remove">移除</button>
      </div>
    </div>
    <h1 id="total">總金額:1000元</h1>
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
