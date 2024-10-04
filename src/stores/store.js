import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const url = 'http://localhost:8000/'

export const useLayoutStore = defineStore('layout', () => {
  const isLogin = ref(false)

  return { isLogin }
})

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const productsPagination = ref({})
  const monthlyNewProducts = ref([])
  const product = ref({})
  const getProducts = () => {
    axios.get(url + 'getProducts').then((res) => {
      products.value = res.data.data
      productsPagination.value = res.data
      console.log(res.data)
    })
  }
  const getMonthlyNewProducts = () => {
    axios.get(url + 'getMonthlyNewProducts').then((res) => {
      monthlyNewProducts.value = res.data.data
    })
  }
  const getProduct = (index) => {
    axios.get(url + 'getProduct', { params: { id: index } }).then((res) => {
      product.value = res.data
    })
  }
  return {
    product,
    products,
    monthlyNewProducts,
    productsPagination,
    getProducts,
    getProduct,
    getMonthlyNewProducts
  }
})
