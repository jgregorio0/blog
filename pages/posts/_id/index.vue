<template>
  <PostDetail :loadedPost="loadedPost"></PostDetail>
</template>

<script>
import axios from "axios";

import PostDetail from '@/components/Posts/PostDetail.vue';

export default {
  components:{
    PostDetail
  },
  asyncData(context) {
    if (context.payload) {
      context.app.head.title = context.payload.postData.title;
      return {
        loadedPost: context.payload.postData
      };
    } else {
      return axios
        .get(process.env.firebaseUrl + "/posts/" + context.params.id + ".json")
        .then(res => {
          context.app.head.title = res.data.title;
          return {
            loadedPost: res.data
          };
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
}
</script>