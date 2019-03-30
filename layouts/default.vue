<template>
  <div>
    <Navigation></Navigation>
    <Header></Header>
    <!-- <TheHeader></TheHeader> -->
    <!-- <TheSidenav></TheSidenav> -->
    <!-- <nuxt/> -->
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'
import Header from '@/components/Navigation/Header.vue'
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'

export default {
  head: {
    title: 'Blog - Jesús Gregorio Pérez - jgregorio'
  },
  components: {
    Navigation,
    Header,
    TheHeader,
    TheSidenav
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
