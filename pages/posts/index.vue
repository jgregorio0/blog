<template>
  <div class="posts-page">
    <h1>Posts</h1>
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
