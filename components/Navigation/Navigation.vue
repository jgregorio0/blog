<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">BLOG</nuxt-link>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/index.html">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'about'}">About</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'posts'}">Posts</nuxt-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="contact.html">Contact</a>
          </li>-->
        </ul>

        <!-- Admin navBar -->
        <b-navbar-nav v-if="this.$store.getters.isAuthenticated" class="ml-auto">
          <b-nav-form>
            <b-button type="button" class="mr-1" size="sm" variant="success" @click="goToNewPost">
              <fa :icon="faPlusSquare"/>
              <span class="ml-1">New Post</span>
            </b-button>
            <b-button size="sm" type="button" @click="logout">
              <fa :icon="faSignOutAlt"/>
              <span class="ml-1">Logout</span>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </div>
    </div>
  </nav>
</template>

<script>
import { faSignOutAlt, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    goToNewPost() {
      this.$router.push("/admin/new-post");
    }
  },
  computed: {
    faSignOutAlt() {
      return faSignOutAlt;
    },
    faPlusSquare() {
      return faPlusSquare;
    }
  }
};
</script>
