<template>
  <div>
    <Navigation></Navigation>
    <nuxt/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'

export default {
  head: {
    title: 'Blog - Jesús Gregorio Pérez - jgregorio'
  },
  components: {
    Navigation
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
