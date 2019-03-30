<template>
  <div>
    <Navigation></Navigation>
    <Header></Header>
    <!-- <TheHeader></TheHeader> -->
    <!-- <TheSidenav></TheSidenav> -->
    <nuxt/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'
import Header from '@/components/Navigation/Header.vue'

export default {
  head: {
    title: 'Blog - Jesús Gregorio Pérez - jgregorio'
  },
  components: {
    Navigation,
    Header
  }
}
</script>

<style>
html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}
</style>
