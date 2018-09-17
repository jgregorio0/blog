<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :previewText="post.previewText"
      :thumbnail="post.thumbnail"
      @rmPost="rmPost"></PostPreview>
  </section>
</template>

<script>
  import PostPreview from '@/components/Posts/PostPreview.vue'

  export default {
    components: {
      PostPreview
    },
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    methods: {
      rmPost (postId) {
        this.$emit('rmPost', postId)
      }
    }
  }
</script>

<style scoped>
  .post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
