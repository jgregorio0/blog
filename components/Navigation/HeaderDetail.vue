<template>
  <header class="masthead" style="background-image: url('/img/enjoyment.jpg')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1>{{ loadedPost.title }}</h1>
            <span class="subheading">Last updated on {{ loadedPost.updatedDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "headerDetail",
  props: {
    loadedPost: {
      type: Object,
      required: true
    }
  }
}
</script>
