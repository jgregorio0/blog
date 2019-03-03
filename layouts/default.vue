<template>
  <div>
    <TheHeader></TheHeader>
    <TheSidenav></TheSidenav>
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'

export default {
  head: {
    title: 'Blog - Jesús Gregorio Pérez - jgregorio'
  },
  components: {
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
