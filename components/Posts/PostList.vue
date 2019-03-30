<template>
  <section class="post-list">
    <b-card-group columns>
      <component
        :is="preview"
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :content="post.content"
        :updatedDate="post.updatedDate"
        @rmPost="rmPost"
      ></component>
    </b-card-group>
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview.vue";
import PostPreviewAdmin from "@/components/Posts/PostPreviewAdmin.vue";

export default {
  components: {
    PostPreview,
    PostPreviewAdmin
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    preview: {
      type: String,
      default: "PostPreview"
    }
  },
  methods: {
    rmPost(postId) {
      this.$emit("rmPost", postId);
    }
  }
};
</script>

<style>
@media (max-width: 992px) {
  .card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media (max-width: 768px) {
  .card-columns {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}
</style>
