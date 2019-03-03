<template>
  <b-card class="post-preview" :footer="updatedDate" :id="this.id">
    <div slot="header">
      <!-- TITLE / DETAIL -->
      <nuxt-link
        class="btn btn-link post-title"
        tag="button"
        title="Go to detail"
        :to="'/posts/' + id"
      >
        <fa :icon="faExternalLinkAlt"/>
        <span>{{title}}</span>
      </nuxt-link>
      <!-- DOWNLOAD -->
      <b-button-group class="float-right">
        <b-button @click="downloadFile" variant="link">
          <fa :icon="faDownload"/>
        </b-button>
      </b-button-group>
    </div>
    <p
      v-cloak
      v-show="false"
      :class="'card-text post-content js-toc-content-' + this.id"
      v-html="contentHTML"
    ></p>
    <p :class="'card-text post-content js-toc-' + this.id"></p>
  </b-card>
</template>

<script>
import showdown from 'showdown'
// eslint-disable-next-line semi
import tocbot from 'tocbot';
import {
  faExternalLinkAlt,
  faDownload
} from '@fortawesome/free-solid-svg-icons'
import { download } from '~/services/download.js'

export default {
  name: 'PostPreview',
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
    contentHTML () {
      let converter = new showdown.Converter()
      return converter.makeHtml(this.content)
    },
    toc () {
      this.contentHTML
      // eslint-disable-next-line no-undef
      return toc.refresh()
    },
    faExternalLinkAlt () {
      return faExternalLinkAlt
    },
    faDownload () {
      return faDownload
    }
  },
  methods: {
    downloadFile () {
      download(this.title + '.md', this.content)
    }
  },
  mounted () {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc-' + this.id,
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content-' + this.id,
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3',
      // overwrite link href behavior for anchors
      onClick: function (e) {
        e.preventDefault()

        var elem = this
        for (
          ;
          elem && elem !== document;
          elem = elem.parentNode
        ) {
          if (elem.className && elem.className.includes('post-preview')) {
            location.href =
              'posts/' +
              elem.id +
              this.href.substring(this.href.indexOf('#'), this.href.length)
          }
        }
      }
    })
  }
}
</script>

<style scoped>
.post-content {
  max-height: 500px;
  overflow-y: scroll;
}
.post-title {
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
