<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
    </section>
    <section class="delete-post">
      <AppButton @click="$router.push('/admin/remove-post')">Delete Post</AppButton>
    </section>
    <section class="delete-post">
      <AppButton @click="logout">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList :posts="loadedPosts"></PostList>
    </section>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    computed: {
      loadedPosts () {
        return this.$store.getters.loadedPosts
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('logout')
        this.$router.push('/admin/auth')
      }
    }
  }
</script>
