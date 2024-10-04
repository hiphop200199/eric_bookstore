<script setup>
import { onMounted, ref } from 'vue'
const cardData = [
  { title: 'lorem', price: '$300' },
  { title: 'yayaya', price: '$400' },
  { title: 'vbn', price: '$123' },
  { title: 'lore', price: '$300' },
  { title: 'yayay', price: '$400' },
  { title: 'vb', price: '$123' },
  { title: 'loremj', price: '$300' },
  { title: 'yayayaj', price: '$400' }
]
const cardWidth = 300
let slideDistance = ref(0)
let scrollY = ref(0)
const cards = ref([])
let slide
onMounted(() => {
  window.addEventListener('scroll', () => (scrollY.value = window.scrollY))
  slide = (dir) => {
    dir === 'left' ? (slideDistance.value -= cardWidth) : (slideDistance.value += cardWidth)
    cards.value.style.transform = `translateX(${slideDistance.value}px)`
  }
})
</script>

<template>
  <div id="homepage-container">
    <img id="img-auto-slide" src="../assets/man-1690965_640.jpg" alt="" />
    <h1>熱門商品</h1>
    <div id="new-items-slider">
      <button id="slide-left" @click="slide('left')" v-if="slideDistance > -3040">
        <img src="../assets/left-arrow.png" alt="" />
      </button>
      <div id="slider">
        <div id="cards" ref="cards">
          <div class="product-card" v-for="(card, index) in cardData" :key="index">
            <router-link to="detail">
              <img class="product-cover" src="../assets/castle.png" alt="" />
            </router-link>
            <p class="product-title">{{ card.title }}</p>
            <p class="product-price">{{ card.price }}</p>
          </div>
        </div>
      </div>
      <button id="slide-right" @click="slide('right')" v-if="slideDistance < 0">
        <img src="../assets/right-arrow.png" alt="" />
      </button>
    </div>
    <h2>讀者回饋</h2>
    <section id="feedbacks">
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur tempora libero
        consequuntur quod quisquam nemo animi dolore ullam repellat tenetur harum sed, ab dolorem
        reiciendis iusto cum facilis inventore facere.
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        <p>Lorem.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sequi consequatur
          inventore.
        </p>
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        Lorem ipsum dolor sit amet consectetur.
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>Lorem, ipsum.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sed? Deserunt aliquid,
          in incidunt dolore excepturi a laborum numquam nesciunt.
        </p>
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem hic perferendis
          libero ipsa culpa officia. Delectus sapiente alias aliquam, amet accusantium doloremque
          natus corporis dolor perspiciatis voluptates, quibusdam reiciendis dolorem inventore sint
          repudiandae, nisi architecto qui odit .
        </p>
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        <p>Lorem, ipsum dolor.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/man-1690965_640.jpg" alt="" />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, fuga.</p>
      </div>
      <div class="feedback-card">
        <img src="../assets/woman-8592765_640.jpg" alt="" />
        <p>Lorem, ipsum dolor.</p>
      </div>
    </section>
    <section id="to-search">
      <h3>搜尋</h3>
      <p>尋找最喜歡的那一本書</p>
      <div id="pic-and-link">
        <img src="../assets/blonde-1866951_1280.jpg" alt="" />
        <router-link to="/list">連結</router-link>
      </div>
    </section>
  </div>
</template>
