import { useAuthStore } from '@/stores/store'
import CartView from '@/views/CartView.vue'
import DetailView from '@/views/DetailView.vue'
import ForgotPasswordView from '@/views/forgotPasswordView.vue'
import HomepageView from '@/views/HomepageView.vue'
import ListView from '@/views/ListView.vue'
import LoginView from '@/views/LoginView.vue'
import MemberView from '@/views/MemberView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import OrderView from '@/views/OrderView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomepageView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/order-detail/:id',
      name: 'order-detail',
      component: OrderDetailView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

//預防沒權限的情況下瀏覽某些路由
router.beforeEach(async (to, from) => {
  const authstore = useAuthStore()
  if (
    // make sure the user is authenticated
    authstore.isLogin === null &&
    // ❗️ Avoid an infinite redirect
    (to.name === 'member' ||
      to.name === 'order' ||
      to.name === 'order-detail' ||
      to.name === 'cart')
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
