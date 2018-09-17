<template>
  <div class="post-preview">
    <button type="button" class="close" aria-label="Close"
            v-if="$route.path.includes('/admin/remove-post')"
            @click="$emit('rmPost', id)">
      <span aria-hidden="true">&times;</span>
    </button>
    <nuxt-link :to="$route.path.includes('/admin') ?  '/admin/' + id : '/posts/' + id">
      <article>
        <div class="post-thumbnail"
             :style="{'background-image': 'url(' + thumbnail + ')'}"></div>
        <div class="post-content">
          <h1>{{ title }}</h1>
          <p>{{ previewText }}</p>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
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
      previewText: {
        type: String,
        required: true
      },
      thumbnail: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (min-width: 850px) {
    .post-preview {
      width: 400px;
      margin: 10px;
    }
  }

  .post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  .post-content {
    padding: 10px;
    text-align: center;
  }

  a:hover .post-content,
  a:active .post-content {
    background-color: #ccc;
  }
</style>
