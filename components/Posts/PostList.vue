<template>
  <section class="post-list">
    <b-card-group deck>
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :content="post.content"
        @rmPost="rmPost"></PostPreview>
    </b-card-group>
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview.vue";

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
    rmPost(postId) {
      this.$emit("rmPost", postId);
    }
  }
};
</script>