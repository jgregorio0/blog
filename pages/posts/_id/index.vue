<template>
  <PostDetail :loadedPost="loadedPost"></PostDetail>
</template>

<script>
import PostDetail from "@/components/Posts/PostDetail.vue";
import axios from "axios";
import fb from "~/services/fireinit.js";

export default {
  components: {
    PostDetail
  },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts.find(post => post.id === this.$route.params.id);
    }
  },
  head() {
    return this.loadedPost
      ? {
          title: `${this.loadedPost.title}`
        }
      : false;
  },
  fetch({ store, error, params, payload }) {
    // console.log("asyncData", context.params.id);
    /* if (payload) {
      // loadPost on static generation
      // context.app.head.title = context.payload.postData.title;
      /* return {
        loadedPost: context.payload.postData
      }; */
      /*console.log('payload :', payload);
      store.commit("setPosts", payload.loadedPosts);
    } else { */
      if (!store.state.loadedPosts) {
        store.dispatch("loadPosts");
      }
      
      const post = store.getters.loadedPosts.find(post => post.id === params.id)

      if (!post) {
        error({ statusCode: 404, message: "Post not found" });
      }

      // (do not load post) load post by id
      // todo fix buefyshop
      /* context.app.store
        .dispatch("loadPost", context.params.id) */
      /* .then(res => {
          if (!res.exists) {
            throw new Error("document not found for id " + postId);
          }

          console.log("res", res);
          console.log("res.data()", res.data());
          context.app.head.title = res.data().title;
          return { loadedPost: { ...res.data(), id: res.id } };
        })
        .catch(e => {
          console.error(e);
        }); */

      /* AXIOS Version
       return axios
        .get(process.env.firebaseUrl + "/posts/" + params.id + ".json")
        .then(res => {
          // context.app.head.title = res.data.title;
          return {
            loadedPost: res.data
          };
        })
        .catch(e => {
          console.error(e);
        }); */
    // }
  }
};
</script>