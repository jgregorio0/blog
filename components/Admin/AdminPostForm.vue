<template>
  <form @submit.prevent="onSave">
    <!-- SAVE OR CANCEL -->
    <b-button-group class="mb-5">
      <b-button type="submit" variant="success">
        <fa :icon="faSave"/>
        <span class="ml-1">Save</span>
        </b-button>
      <b-button type="button" variant="danger" @click="onCancel">
        <fa :icon="faBan"/>
        <span class="ml-1">Cancel</span>
      </b-button>
    </b-button-group>
    
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
    <input type="hidden" :value="updatedDate">
  </form>
</template>

<script>
import showdown from "showdown";
import { faSave, faBan } from "@fortawesome/free-solid-svg-icons";

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
        ? {
            ...this.post,
            updatedDate: new Date().toISOString()
          }
        : {
            title: "",
            content: "",
            updatedDate: new Date().toISOString()
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
    },
    faSave() {
      return faSave;
    },
    faBan() {
      return faBan;
    }
  }
};
</script>