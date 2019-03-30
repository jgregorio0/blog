<template>
  <div>
    <hr>
    <div class="clearfix">
      <b-button class="btn btn-primary float-left" v-if="showPreviousPage" @click="previousPage">Newer Posts</b-button>
      <b-button class="btn btn-primary float-right" v-if="showNextPage" @click="nextPage" >Older Posts</b-button>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  computed: {
    postsLength() {
      const posts = this.$store.getters.loadedPosts;
      return posts.length;
    },
    page() {
      const page = this.$store.getters.page;
      return page;
    },
    showNextPage() {
      return this.postsLength > 9 * (this.page);
    },
    showPreviousPage() {
      return this.page > 1;
    }
  },
  methods: {
    previousPage() {
      this.$store.dispatch("previousPage");
    },
    nextPage() {
      this.$store.dispatch("nextPage");
    }
  }
};
</script>
