<script setup>
import { useProductStore } from '@/stores/store'
import { computed } from 'vue'
const productStore = useProductStore()
const products = computed(() => productStore.products)
const productsPagination = computed(() => productStore.productsPagination)
const monthlyNewProducts = computed(() => productStore.monthlyNewProducts)
const getProducts = (url = null) => {
  productStore.getProducts(url)
}
const getMonthlyNewProducts = () => {
  productStore.getMonthlyNewProducts()
}
const htmlDecode = (str) => {
  let txt = document.createElement('textarea')
  if (str.search(/\D/i) !== -1) {
    txt.innerHTML = str
    let res
    if (txt.innerHTML.search(/«/) !== -1) res = '<'
    else res = '>'
    return res
  } else {
    return str
  }
}
getMonthlyNewProducts()
getProducts()
</script>

<template>
  <div id="product-container">
    <h1>本月新書</h1>
    <div class="product-box">
      <div class="product-card" v-for="(product, index) in monthlyNewProducts" :key="index">
        <router-link :to="'detail/' + product.id">
          <img class="product-cover" :src="product.image_source" alt="" />
        </router-link>
        <p class="product-title">{{ product.name }}</p>
        <p class="product-price">${{ product.price }}</p>
      </div>
    </div>
    <h1>特定書本查尋</h1>
    <section id="class-filters">
      <button>文學</button>
      <button>科技</button>
      <button>語言</button>
    </section>
    <input type="search" name="" id="ambiguous-search" placeholder="請輸入關鍵字..." />
    <div class="product-box">
      <div class="product-card" v-for="(product, index) in products" :key="index">
        <router-link :to="'detail/' + product.id">
          <img class="product-cover" :src="product.image_source" alt="" />
        </router-link>
        <p class="product-title">{{ product.name }}</p>
        <p class="product-price">${{ product.price }}</p>
      </div>
    </div>
    <section class="pagination">
      <button
        @click="getProducts(productsPagination.first_page_url)"
        :disabled="productsPagination.current_page == 1"
      >
        <<
      </button>
      <button
        @click="getProducts(productsPagination.prev_page_url)"
        :disabled="productsPagination.current_page == 1"
      >
        <
      </button>
      <button
        @click="getProducts(productsPagination.links[index].url)"
        :class="productsPagination.links[index].active ? 'active' : ''"
        v-for="index in productsPagination.last_page"
        :key="index"
      >
        {{ htmlDecode(productsPagination.links[index].label) }}
      </button>
      <button
        @click="getProducts(productsPagination.next_page_url)"
        :disabled="productsPagination.current_page == productsPagination.last_page"
      >
        >
      </button>
      <button
        @click="getProducts(productsPagination.last_page_url)"
        :disabled="productsPagination.current_page == productsPagination.last_page"
      >
        >>
      </button>
    </section>
  </div>
</template>
