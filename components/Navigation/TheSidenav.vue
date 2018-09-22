<template>
<div class="sidenav-container">
  <div
    v-if="show"
    class="sidenav-backdrop"
    @click="$emit('close')"></div>
  <transition name="slide-side">
    <div
      v-if="show"
      class="sidenav">
      <ul
        class="nav-list"
        @click="$emit('close')">
        <li class="nav-item"><nuxt-link to="/posts">Blog</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/about">About</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/admin">Admin</nuxt-link></li>
      </ul>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: "TheSidenav",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>
