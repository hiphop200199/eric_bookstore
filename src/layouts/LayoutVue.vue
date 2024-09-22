<script setup>
import { useLayoutStore } from '@/stores/store'
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
const store = useLayoutStore()
const asideMenuPic = ref(null)
const asideMenu = ref(null)
let isLogin = store.isLogin
const toggleAsideMenu = () => {
  asideMenuPic.value.classList.toggle('rotated')
  asideMenu.value.classList.toggle('active')
}
</script>

<template>
  <div id="layout">
    <header>
      <router-link to="/"><img src="../assets/book.png" alt="logo" /></router-link>
      <nav>
        <section v-if="isLogin">
          <router-link to="/"><img src="../assets/log-out.png" alt="" id="logout" /></router-link>
          <router-link to="/"><img src="../assets/user.png" alt="" id="user" /></router-link>
          <router-link to="/"><img src="../assets/view-list.png" alt="" id="order" /></router-link>
          <router-link to="/"
            ><img src="../assets/shopping-cart.png" alt="" id="cart"
          /></router-link>
        </section>
        <router-link to="/" v-else
          ><img src="../assets/log-in.png" alt="" id="login"
        /></router-link>
        <button id="aside-menu-btn" @click="toggleAsideMenu">
          <img
            ref="asideMenuPic"
            src="../assets/menu.png"
            alt="aside-menu-pic"
            id="aside-menu-pic"
          />
        </button>
      </nav>
    </header>
    <router-view />
    <footer>
      <router-link to="/"><img src="../assets/book.png" alt="logo" /></router-link>
      <p id="copyright">Copyright © Reading 2024 | All Rights Reserved.</p>
      <a href="https://www.instagram.com/" target="_blank"
        ><img src="../assets/instagram.png" alt="" id="instagram"
      /></a>
    </footer>
    <aside ref="asideMenu">
      <section v-if="isLogin">
        <router-link to="/">登出</router-link>
        <router-link to="/">會員資料</router-link>
        <router-link to="/">訂單查詢</router-link>
        <router-link to="/">購物車</router-link>
      </section>
      <router-link v-else to="/">登入</router-link>
    </aside>
    <a href="#" id="to-top"><img src="../assets/up-arrow.png" alt="" /></a>
  </div>
</template>
