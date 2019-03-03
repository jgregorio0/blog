<template>
  <div class="home-page">
    <!-- <h1>Latest Posts</h1> -->
    <PostList :posts="loadedPosts"></PostList>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>
