<template>
<div class="header-container">
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">BLOG</b-navbar-brand>

  <b-navbar-nav class="header-items">
    <b-nav-item :to="{name: 'posts'}">Posts</b-nav-item>
    <b-nav-item :to="{name: 'about'}">About</b-nav-item>
    <b-nav-item :to="{name: 'admin'}">Admin</b-nav-item>
  </b-navbar-nav>
  
  <b-navbar-nav v-if="this.$store.getters.isAuthenticated" class="ml-auto">
    <b-nav-form >
        <b-button type="button" class="mr-1" size="sm" variant="success"
          @click="logout">
          <fa :icon="faPlusSquare"/>
          <span class="ml-1">New Post</span>
        </b-button>
        <b-button size="sm" type="button" @click="logout">
          <fa :icon="faSignOutAlt"/>
          <span class="ml-1">Logout</span>
        </b-button>
    </b-nav-form>
  </b-navbar-nav>
</b-navbar>
</div>
</template>

<script>
import { faSignOutAlt, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
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
