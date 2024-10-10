import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
const baseUrl = 'http://localhost:8000/'

export const useAuthStore = defineStore('auth', () => {
  const memberId = ref(sessionStorage.getItem('id'))
  const isLogin = ref(sessionStorage.getItem('token'))
  const isLoading = ref(true)
  const message = ref('')
  const user = ref({})
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
        .then((res) => {
          message.value = ''
          sessionStorage.setItem('token', document.cookie)
          sessionStorage.setItem('id', res.data[0].id)
          isLogin.value = sessionStorage.getItem('token')
          memberId.value = sessionStorage.getItem('id')
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
          sessionStorage.setItem('id', res.data[0].id)
          memberId.value = sessionStorage.getItem('id')
          isLogin.value = sessionStorage.getItem('token')
          console.log(res)

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
          sessionStorage.removeItem('id')
          memberId.value = sessionStorage.getItem('id')
          isLogin.value = sessionStorage.getItem('token')
          router.push({ path: '/' })
        })
        .catch((err) => console.log(err))
    })
  }
  const getUser = () => {
    isLoading.value = true
    axios
      .get(baseUrl + 'getUser', { params: { id: memberId.value } })
      .then((res) => {
        user.value = res.data[0]
        isLoading.value = false
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  const editUser = (phone, address) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .put(baseUrl + 'editUser', {
          id: memberId.value,
          phone: phone,
          address: address
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
    })
  }
  return {
    user,
    isLoading,
    memberId,
    isLogin,
    message,
    handleRegister,
    handleLogout,
    handleLogIn,
    getUser,
    editUser
  }
})

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(true)
  const products = ref([])
  const productsPagination = ref({})
  const monthlyNewProducts = ref([])
  const product = ref({})
  const getProducts = (url = null) => {
    isLoading.value = true
    let finalUrl
    if (url) finalUrl = url
    else finalUrl = baseUrl + 'getProducts'
    axios.get(finalUrl).then((res) => {
      products.value = res.data.data
      productsPagination.value = res.data
      isLoading.value = false
    })
  }
  const getMonthlyNewProducts = () => {
    isLoading.value = true
    axios.get(baseUrl + 'getMonthlyNewProducts').then((res) => {
      monthlyNewProducts.value = res.data.data
    })
  }
  const getProduct = (index) => {
    isLoading.value = true
    axios.get(baseUrl + 'getProduct', { params: { id: index } }).then((res) => {
      product.value = res.data
      isLoading.value = false
    })
  }
  return {
    isLoading,
    product,
    products,
    monthlyNewProducts,
    productsPagination,
    getProducts,
    getProduct,
    getMonthlyNewProducts
  }
})

export const useCartStore = defineStore('cart', () => {
  const isLoading = ref(true)
  const items = ref([])
  const total = ref(0)
  const getItems = () => {
    axios
      .get(baseUrl + 'getItems', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        items.value = res.data
        total.value = res.data.reduce(function (a, c) {
          return a + c.price * c.amount
        }, 0)
        isLoading.value = false
        console.log(res, total.value)
      })
      .catch((err) => console.log(err))
  }
  const addItem = (id) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'addItem', {
          id: id,
          memberId: sessionStorage.getItem('id')
        })
        .then((res) => {
          console.log(res)
          router.push({ path: '/list' })
        })
        .catch((err) => console.log(err))
    })
  }
  const removeItem = (id) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .delete(baseUrl + 'removeItem', {
          params: {
            id: id
          }
        })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }
  const adjustAmount = (id, amount) => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .put(baseUrl + 'editItem', {
          id: id,
          amount: amount
        })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }
  return { isLoading, items, total, getItems, addItem, removeItem, adjustAmount }
})

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(true)
  const orders = ref([])
  const order = ref([])
  const getOrders = () => {
    isLoading.value = true
    // axios.get(baseUrl + 'getOrders').then((res) => {
    //   // orders.value = res.data.data
    //   isLoading.value = false
    // })
  }
  const getOrder = (index) => {
    isLoading.value = true
    // axios.get(baseUrl + 'getOrder', { params: { id: index } }).then((res) => {
    //   // order.value = res.data
    //   isLoading.value = false
    // })
  }
  return { isLoading, orders, order, getOrders, getOrder }
})
