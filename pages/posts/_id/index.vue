<template>
  <PostDetail :loadedPost="loadedPost"></PostDetail>
</template>

<script>
import PostDetail from "@/components/Posts/PostDetail.vue";
// import axios from "axios";
import fb from "~/services/fireinit.js";

export default {
  components: {
    PostDetail
  },
  asyncData(context) {
    if (context.payload) {
      context.app.head.title = context.payload.postData.title;
      return {
        loadedPost: context.payload.postData
      };
    } else {
      // console.log('asyncData', context.params.postId)
      return fb.posts
        .doc(context.params.id)
        .get()
        .then(res => {
          if (!res.exists) {
            throw new Error("document not found for id " + context.params.id);
          }
          // console.log("res", res);
          // console.log('res.data()', res.data())
          context.app.head.title = res.data().title;
          return {
            loadedPost: { ...res.data(), id: res.id }
          };
        })
        .catch(e => {
          console.error(e);
        });
      /* return axios
        .get(process.env.firebaseUrl + "/posts/" + context.params.id + ".json")
        .then(res => {
          context.app.head.title = res.data.title;
          return {
            loadedPost: res.data
          };
        })
        .catch(e => {
          console.error(e);
        }); */
    }
  }
};
</script>