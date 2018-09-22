<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="addPost"></AdminPostForm>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '@/components/Admin/AdminPostForm.vue'
  // import firebase from 'firebase'

  export default {
    layout: 'admin',
    components: {
      AdminPostForm
    },
    methods: {
      addPost (postData) {
        // firebase.database().ref('posts').push(postData)
        this.$store.dispatch('addPost', postData)
          .then(() => {
            this.$router.push('/admin')
          })
      }
    }
  }
</script>
