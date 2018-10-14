<template>
  <div class="home-page">
    <section class="intro">
      <h1>Latest docs!</h1>
    </section>
    <PostList :posts="loadedPosts"></PostList>
  </div>
</template>

<script>
  export default {
    computed: {
      loadedPosts () {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>
