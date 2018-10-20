<template>
  <form @submit.prevent="onSave">
    <!-- TITLE -->
    <b-form-group id="titleGroup"
                    label="Title:"
                    label-for="title">
        <b-form-input id="title"
                      type="text"
                      v-model="editedPost.title"
                      required
                      placeholder="Enter title">
        </b-form-input>
      </b-form-group>
    <div class="row">
      <div class="col-6">
        <!-- CONTENT -->
        <b-form-group id="contentGroup"
                    label="Content:"
                    label-for="content">
          <b-form-textarea id="content"
                      v-model="editedPost.content"
                      placeholder="Enter markdown content"
                      :rows="10"
                      :max-rows="30">
          </b-form-textarea>
        </b-form-group>
      </div>
      <!-- CONTENT SHOW -->
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