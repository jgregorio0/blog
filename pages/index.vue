<template>
  <div class="home-page container">
    <Pager></Pager>
    <PostList :posts="loadedPosts"></PostList>
    <Pager></Pager>
  </div>
</template>

<script>

import Pager from "@/components/Navigation/Pager.vue";

export default {
  components: {
    Pager
  },
  computed: {
    loadedPosts() {
      const posts = this.$store.getters.loadedPosts
      const page = this.page
      return posts.length > 9 ? posts.slice(9 * (page - 1), 9 * page): posts
    },
    page () {
      const page = this.$store.getters.page
      return page
    }
  }
};
</script>
