import { computed, h, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
const baseUrl = 'http://localhost:8000/'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(sessionStorage.getItem('token'))
  const message = ref('')
  const handleRegister = (name, email, password, passwordConfirm) => {
    message.value = '請稍候...'
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm
        })
        .then(() => {
          message.value = ''
          sessionStorage.setItem('token', document.cookie)
          isLogin.value = sessionStorage.getItem('token')
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  const handleLogIn = (email, password) => {
    message.value = '請稍候...'
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'login', {
          email: email,
          password: password
        })
        .then((res) => {
          message.value = ''
          sessionStorage.setItem('token', document.cookie)
          isLogin.value = sessionStorage.getItem('token')
          router.push({ path: '/' })
        })
        .catch((err) => {
          if (err.response.data.message == 'These credentials do not match our records.') {
            message.value = '帳號或密碼有誤'
          }
          console.log(err)
        })
    })
  }
  const handleLogout = () => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'logout')
        .then(() => {
          sessionStorage.removeItem('token')
          isLogin.value = sessionStorage.getItem('token')
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  return { isLogin, message, handleRegister, handleLogout, handleLogIn }
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
