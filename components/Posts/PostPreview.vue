<template>
  <b-card class="post-preview">
      <div slot="header" >
        <span>{{title}}</span>
        <nuxt-link title="Go to detail" class="float-right" 
          :to="$route.path.includes('/admin') ?  '/admin/' + id : '/posts/' + id">
          <fa :icon="faExternalLinkAlt" />
        </nuxt-link>
      </div>
    <button type="button" class="close" aria-label="Close"
            v-if="$route.path.includes('/admin/remove-post')"
            @click="$emit('rmPost', id)">
      <span aria-hidden="true">&times;</span>
    </button>
    <p class="card-text post-content" v-html="contentHTML"></p>
  </b-card>
</template>

<script>
import showdown from "showdown";
import tocbot from "tocbot";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
    faExternalLinkAlt() {
      return faExternalLinkAlt;
    }
  }
};
</script>
<style scoped>
.post-content {
  max-height: 200px;
  overflow-y: scroll;
}
</style>