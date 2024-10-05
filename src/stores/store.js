import { h, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
const baseUrl = 'http://localhost:8000/'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const handleRegister = (name, email, password, passwordConfirm) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm
        })
        .then(() => {
          isLogin.value = true
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  const handleLogIn = (email, password) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'login', {
          email: email,
          password: password
        })
        .then((res) => {
          isLogin.value = true
          console.log(res, isLogin)
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  const handleLogout = () => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'logout')
        .then(() => {
          isLogin.value = false
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  return { isLogin, handleRegister, handleLogout, handleLogIn }
})

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const productsPagination = ref({})
  const monthlyNewProducts = ref([])
  const product = ref({})
  const getProducts = (url = null) => {
    let finalUrl
    if (url) finalUrl = url
    else finalUrl = baseUrl + 'getProducts'
    axios.get(finalUrl).then((res) => {
      products.value = res.data.data
      productsPagination.value = res.data
    })
  }
  const getMonthlyNewProducts = () => {
    axios.get(baseUrl + 'getMonthlyNewProducts').then((res) => {
      monthlyNewProducts.value = res.data.data
    })
  }
  const getProduct = (index) => {
    axios.get(baseUrl + 'getProduct', { params: { id: index } }).then((res) => {
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
