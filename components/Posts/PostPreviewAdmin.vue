<template>
  <b-card class="post-preview">
      <div slot="header" >
        <span>{{title}}</span>
        <nuxt-link title="Edit post" class="float-right" 
          :to="'/admin/' + id">
          <fa :icon="faPencilAlt" />
        </nuxt-link>
        <a href="#" class="float-right mr-3" title="Remove post"
            @click.prevent="$emit('rmPost', id)">
          <fa :icon="faTimes" />
        </a>
      </div>
    <p class="card-text post-content" v-html="contentHTML"></p>
  </b-card>
</template>

<script>
import showdown from "showdown";
import tocbot from "tocbot";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    faPencilAlt() {
      return faPencilAlt;
    },
    faTimes() {
      return faTimes;
    }
  }
};
</script>
<style scoped>
.post-content {
  height: 200px;
  overflow-y: scroll;
}
</style>