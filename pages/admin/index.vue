<template>
  <div class="admin-page">
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList :posts="loadedPosts" preview='PostPreviewAdmin' @rmPost="rmPost"></PostList>
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  },
  methods: {
    rmPost(postId) {
      this.$store.dispatch("rmPost", postId);
    }
  }
};
</script>
