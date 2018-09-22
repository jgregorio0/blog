<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.content"
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