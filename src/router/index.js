import DetailView from '@/views/DetailView.vue'
import HomepageView from '@/views/HomepageView.vue'
import ListView from '@/views/ListView.vue'
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
      path: '/detail',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DetailView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
