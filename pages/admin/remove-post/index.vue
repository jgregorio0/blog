<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <PostList :posts="loadedPosts" @rmPost="rmPost"></PostList>
    </section>
  </div>
</template>

<script>
  // import firebase from 'firebase'

  export default {
    layout: 'admin',
    methods: {
      rmPost (postId) {
        // firebase.database().ref('posts').push(postData)
        this.$store.dispatch('rmPost', postId)
        /*.then(() => {
          this.$router.push('/admin')
        })*/
      }
    },
    computed: {
      loadedPosts () {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>
