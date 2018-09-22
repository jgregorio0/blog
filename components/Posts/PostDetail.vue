<template>
  <div class="single-post-page">
<!-- <Spinner v-if="loadedPost == null"></Spinner> -->
    <section class="post">
      <article>
        <!-- TITLE AND DETAILS -->
        <h1 class="post-title">{{ loadedPost.title }}</h1>
        <div class="post-details">
          <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        </div>
        <!-- MARKDOWN VIEWER -->
        <div class="row">
          <div class="col-9 post-content js-toc-content">
            <!-- TODO MD VIEWER -->
            <span v-html="contentHTML"></span>
          </div>
          <div class="col-3 js-toc"></div>
        </div>
      </article>
    </section>
    <section class="post-feedback">
      <!-- TODO COMMENTS -->
      <p>Let me know what you think about the post, send email to <a href="mailto:gregoriojesus0@gmail.com">asdf@asdf.com</a>.</p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import showdown from "showdown";

export default {
  name: 'postDetail',
  props: {
    loadedPost: {
      type: Object,
      required: true
    },
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
        e.preventDefault()
        location.hash=this.href.substring(this.href.indexOf("#"), this.href.length)
      }
    })
  }
}
</script>
