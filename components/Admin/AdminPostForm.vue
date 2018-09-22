<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <div class="row">
      <div class="col-6">
        <AppControlInput
          control-type="textarea"
          v-model="editedPost.content">Markdown Content
        </AppControlInput>
      </div>
      <div class="col-6" v-html="contentHTML"></div>
    </div>
    <input type="hidden" :value="editedPost.updatedDate">
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel
    </AppButton>
  </form>
</template>

<script>
import showdown from "showdown";

export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            title: "",
            content: "",
            updatedDate: new Date()
          }
    };
  },
  methods: {
    onSave() {
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      this.$router.push("/admin");
    }
  },
  computed: {
    contentHTML() {
      let converter = new showdown.Converter();
      return converter.makeHtml(this.editedPost.content);
    }
  }
};
</script>