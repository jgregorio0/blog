<template>
  <div class="admin-post-page">
    <section class="update-form">
      <h1>Update post</h1>
      <AdminPostForm :post="loadedPost" @submit="updatePost"></AdminPostForm>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
// import axios from 'axios'
import fb from "~/services/fireinit.js";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    // console.log('asyncData', context.params.postId)
    return fb.posts
      .doc(context.params.postId).get()
      .then(res => {
        // console.log('res.data()', res.data())
        return {
          loadedPost: { ...res.data(), id: context.params.postId }
        };
      })
      .catch(e => {
        console.error(e);
      });
    /* return axios.get(process.env.firebaseUrl + '/posts/' + context.params.postId + '.json')
        .then(res => {
          return {
            loadedPost: {...res.data, id: context.params.postId}
          }
        })
        .catch(e => {
          console.error(e)
        }) */
  },
  methods: {
    updatePost(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>
