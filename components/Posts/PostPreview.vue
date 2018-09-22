<template>
  <div class="post-preview">
    <button type="button" class="close" aria-label="Close"
            v-if="$route.path.includes('/admin/remove-post')"
            @click="$emit('rmPost', id)">
      <span aria-hidden="true">&times;</span>
    </button>
      <article>
        <nuxt-link :to="$route.path.includes('/admin') ?  '/admin/' + id : '/posts/' + id">
          <div class="post-title">
            <h1>{{ title }}</h1>
          </div>
        </nuxt-link>
          <div class="post-content" v-html="contentHTML">
            
        </div>
      </article>
  </div>
</template>

<script>
import showdown from "showdown";
import tocbot from "tocbot";

export default {
  name: "PostPreview",
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    contentHTML() {
      let converter = new showdown.Converter();
      return converter.makeHtml(this.content);
    },
    toc() {
      this.contentHTML;
      return toc.refresh();
    }
  },
  mounted() {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3"
    });
  }
};
</script>
<style scoped>
.post-content {
  max-height: 200px;
  overflow-y: scroll;
}
</style>