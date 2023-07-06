<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import FaceDetection from '@/components/FaceDetection.vue'
import { useDistanceStore } from '@/stores/distance'
import { storeToRefs } from 'pinia'

const store = useDistanceStore()
const { distance } = storeToRefs(store)

// Defines the bluriness of the starting point
// The higher the less blur
const bluriness = 6
const filter = computed(() => {
  return `${Math.floor(distance.value / bluriness)}px`
})
</script>

<template>
  <main class="filter">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <!-- Start - Magic operates here -->
        <FaceDetection />
        <!-- End - Magic operates here -->
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </main>
</template>

<style>
/** START DO NOT ERASE THIS -- NEEDED TO BLUR SCREEN */
.filter {
  filter: blur(v-bind(filter));
}
/** END DO NOT ERASE THIS -- NEEDED TO BLUR SCREEN */
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
