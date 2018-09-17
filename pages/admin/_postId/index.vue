<template>
  <div class="admin-post-page">
    <section class="update-form">
      <h1>Update post</h1>
      <AdminPostForm :post="loadedPost" @submit="updatePost"></AdminPostForm>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '@/components/Admin/AdminPostForm.vue'
  import axios from 'axios'

  export default {
    layout: 'admin',
    components: {
      AdminPostForm
    },
    asyncData (context) {
      return axios.get(process.env.firebaseUrl + '/posts/' + context.params.postId + '.json')
        .then(res => {
          return {
            loadedPost: {...res.data, id: context.params.postId}
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    methods: {
      updatePost (editedPost) {
        this.$store.dispatch('editPost', editedPost)
          .then(() => {
            this.$router.push('/admin')
          })
      }
    }
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
