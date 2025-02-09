import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import myAxios from './my-axios'

export const useAuthStore = defineStore('auth', () => {
  const memberId = ref(sessionStorage.getItem('id'))
  const isLogin = ref(sessionStorage.getItem('token'))
  const isLoading = ref(true)
  const message = ref('')
  const user = ref(JSON.parse(sessionStorage.getItem('user')))
  const handleRegister = (name, email, password, passwordConfirm, tel, address) => {
    message.value = '請稍候...'

    myAxios
      .post('/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
        tel: tel,
        address: address
      })
      .then((res) => {
        message.value = ''
        sessionStorage.setItem('token', document.cookie.slice(document.cookie.indexOf('=') + 1))
        sessionStorage.setItem('id', res.data[0].id)
        isLogin.value = sessionStorage.getItem('token')
        memberId.value = sessionStorage.getItem('id')
        router.push({ path: '/' })
        //location.href = location.origin + '/eric_bookstore/'
        getUser()
      })
      .catch((err) => console.log(err))
  }
  const handleLogIn = (email, password) => {
    message.value = '請稍候...'
    myAxios
      .post('/api/login', {
        email: email,
        password: password
      })
      .then((res) => {
        message.value = ''
        sessionStorage.setItem('token', document.cookie.slice(document.cookie.indexOf('=') + 1))
        sessionStorage.setItem('id', res.data[0].id)
        memberId.value = sessionStorage.getItem('id')
        isLogin.value = sessionStorage.getItem('token')
        console.log(res)

        router.push({ path: '/' })
        //location.href = location.origin + '/eric_bookstore/'
        getUser()
      })
      .catch((err) => {
        if (err['response']['data']['message'] === 'These credentials do not match our records.') {
          message.value = '帳號或密碼有誤'
          setTimeout(() => (message.value = ''), 2000)
        }
        console.log(err)
      })
  }
  const handleLogout = () => {
    myAxios
      .post('/api/logout')
      .then(() => {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        memberId.value = sessionStorage.getItem('id')
        isLogin.value = sessionStorage.getItem('token')
        user.value = sessionStorage.getItem('user')

        router.push({ path: '/' })
        //location.href = location.origin + '/eric_bookstore/'
      })
      .catch((err) => console.log(err))
  }
  const getUser = () => {
    if (user.value) {
      isLoading.value = false
      return
    }
    isLoading.value = true
    myAxios
      .get('/api/getUser', { params: { id: memberId.value } })
      .then((res) => {
        isLoading.value = false
        console.log(res)
        sessionStorage.setItem('user', JSON.stringify(res.data[0]))
        user.value = JSON.parse(sessionStorage.getItem('user'))
      })
      .catch((err) => console.log(err))
  }
  const editUser = (phone, address) => {
    isLoading.value = true
    myAxios
      .put('/api/editUser', {
        id: memberId.value,
        phone: phone,
        address: address
      })
      .then((res) => {
        console.log(res)
        sessionStorage.setItem('user', JSON.stringify(res.data))
        user.value = JSON.parse(sessionStorage.getItem('user'))
        location.reload()
        isLoading.value = false
      })
      .catch((err) => console.log(err))
  }
  const forgotPassword = (email) => {
    message.value = '請稍候...'
    myAxios
      .post('/api/forgot-password', {
        email: email
      })
      .then((res) => {
        message.value = res.data.status
        console.log(res)
        setTimeout(() => (message.value = ''), 3000)
      })
      .catch((err) => console.log(err))
  }
  const passwordReset = (token, email, password, passwordConfirm) => {
    message.value = '請稍候...'
    myAxios
      .post('/api/reset-password', {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirm
      })
      .then((res) => {
        message.value = res.data.status
        console.log(res)
        setTimeout(() => {
          message.value = ''
          router.push({ path: '/' })
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
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
    editUser,
    forgotPassword,
    passwordReset
  }
})

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(true)
  const products = ref([]) /* ref(JSON.parse(sessionStorage.getItem('products-list'))) */
  //const listUrl = ref(sessionStorage.getItem('list-url'))
  const productsPagination = ref({}) /* ref(JSON.parse(sessionStorage.getItem('paginate'))) */
  //const monthlyNewProducts = ref([])
  const popularProducts = ref([])
  const product = ref({})
  const getProducts = (url = null, text = null) => {
    /*  if (
      (url !== null && url === listUrl.value) ||
      (url === null && listUrl.value !== null && text === null)
    ) {
      isLoading.value = false
      return
    } else { */
    let finalUrl = url || '/api/getProducts?page=1'
    if (text) finalUrl += '&text=' + text
    isLoading.value = true
    myAxios.get(finalUrl).then((res) => {
      isLoading.value = false
      console.log(res)
      // sessionStorage.setItem('products-list', JSON.stringify(res.data.data))
      products.value = res.data.data
      /* JSON.parse(sessionStorage.getItem('products-list')) */
      //  sessionStorage.setItem('paginate', JSON.stringify(res.data))
      productsPagination.value = res.data /*  JSON.parse(sessionStorage.getItem('paginate')) */
      //   sessionStorage.setItem('list-url', finalUrl)
      //   listUrl.value = sessionStorage.getItem('list-url')
    })
  }
  /* const getMonthlyNewProducts = () => {
    isLoading.value = true
    axios.get(baseUrl + 'getMonthlyNewProducts').then((res) => {
      monthlyNewProducts.value = res.data.data
    })
  } */
  const getProduct = (index) => {
    isLoading.value = true
    myAxios.get('/api/getProduct', { params: { id: index } }).then((res) => {
      product.value = res.data
      isLoading.value = false
    })
  }
  const getPopularProducts = () => {
    isLoading.value = true
    myAxios
      .get('/api/getPopularProducts')
      .then((res) => {
        console.log(res)
        popularProducts.value = res.data
        isLoading.value = false
      })
      .catch((err) => console.log(err))
  }
  return {
    // listUrl,
    isLoading,
    product,
    products,
    // monthlyNewProducts,
    popularProducts,
    productsPagination,
    getProducts,
    getProduct,
    getPopularProducts
    //getMonthlyNewProducts
  }
})

export const useCartStore = defineStore('cart', () => {
  const isLoading = ref(true)
  const items = ref([])
  const total = ref(0)
  const getItems = () => {
    isLoading.value = true
    myAxios
      .get('/api/getItems', { params: { id: sessionStorage.getItem('id') } })
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
  const addItem = (id, mode) => {
    let product = useProductStore()
    product.isLoading = true //使用別的store裡的屬性時，直接賦值即可
    isLoading.value = true
    myAxios
      .post('/api/addItem', {
        id: id,
        memberId: sessionStorage.getItem('id')
      })
      .then((res) => {
        console.log(res)

        if (mode === 'P') {
          router.push({ path: '/cart' })
        } else {
          router.push({ path: '/list' })
        }
        isLoading.value = false
        product.isLoading = false
      })
      .catch((err) => console.log(err))
  }
  const removeItem = (id) => {
    isLoading.value = true
    myAxios
      .delete('/api/removeItem', {
        params: {
          id: id
        }
      })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }
  const adjustAmount = (id, amount) => {
    isLoading.value = true
    myAxios
      .put('/api/editItem', {
        id: id,
        amount: amount
      })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }
  const handleCheckout = (name, tel, address) => {
    isLoading.value = true
    myAxios
      .post('/api/checkout', {
        id: sessionStorage.getItem('id'),
        receiverName: name,
        receiverTel: tel,
        receiverAddress: address
      })
      .then((res) => {
        console.log(res)
        window.location.href = res.data.url
      })
      .catch((err) => console.log(err))
  }
  const checkoutSuccess = (id) => {
    isLoading.value = true
    myAxios
      .put('/api/success', {
        session_id: id,
        id: sessionStorage.getItem('id')
      })
      .then((res) => {
        console.log(res)
        isLoading.value = false
      })
      .catch((err) => console.log(err))
  }
  return {
    isLoading,
    items,
    total,
    getItems,
    addItem,
    removeItem,
    adjustAmount,
    handleCheckout,
    checkoutSuccess
  }
})

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(true)
  const orders = ref([])
  const order = ref([])
  const getOrders = () => {
    isLoading.value = true
    myAxios
      .get('/api/getOrders', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        orders.value = res.data
        isLoading.value = false
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  const getOrder = (id) => {
    isLoading.value = true
    myAxios
      .get('/api/getOrder', { params: { id: id } })
      .then((res) => {
        order.value = res.data
        isLoading.value = false
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  return { isLoading, orders, order, getOrders, getOrder }
})
