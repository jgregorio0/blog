<template>
  <article>
    <div class="single-post-page mt-5 container">
      <!-- MARKDOWN VIEWER -->
      <div class="row">
        <div class="col-12 order-2 col-md-9 order-md-1 post-content js-toc-content">
          <!-- TODO MD VIEWER -->
          <div v-html="contentHTML"></div>
        </div>
        <div class="col-12 order-1 col-md-3 order-md-2 js-toc"></div>
      </div>
    </div>
  </article>
</template>

<script>
// import axios from "axios";
import showdown from "showdown";

export default {
  name: "postDetail",
  props: {
    loadedPost: {
      type: Object,
      required: true
    }
  },
  computed: {
    contentHTML() {
      let converter = new showdown.Converter();
      return converter.makeHtml(this.loadedPost.content);
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
      headingSelector: "h1, h2, h3",
      // overwrite link href behavior for anchors
      onClick: function(e) {
        e.preventDefault();
        location.hash = this.href.substring(
          this.href.indexOf("#"),
          this.href.length
        );
      }
    });
  }
};
</script>
