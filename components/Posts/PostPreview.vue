<template>
  <b-card class="post-preview" 
    :footer="updatedDate">
    <div slot="header" >
      <!-- TITLE / DETAIL -->
      <nuxt-link class="btn btn-link" tag="button" title="Go to detail"  
          :to="'/posts/' + id">
        <span>{{title}}</span>
        <fa :icon="faExternalLinkAlt" />
      </nuxt-link>
       <!-- DOWNLOAD -->
      <b-button-group class="float-right">
        
        <b-button @click="downloadFile" variant="link">
          <fa :icon="faDownload" />
        </b-button>
      </b-button-group>
    </div>
    <p class="card-text post-content" v-html="contentHTML"></p>
  </b-card>
</template>

<script>
import showdown from "showdown";
import tocbot from "tocbot";
import {
  faExternalLinkAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { download } from "~/services/download.js";

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
    },
    updatedDate: {
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
    },
    faDownload() {
      return faDownload;
    }
  },
  methods: {
    downloadFile() {
      download(this.title + ".md", this.content);
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