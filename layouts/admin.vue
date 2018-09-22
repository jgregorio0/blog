<template>
  <div>    
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav"></TheHeader>
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false"></TheSidenav>
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader.vue";
import TheSidenav from "@/components/Navigation/TheSidenav.vue";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    };
  }
};
</script>

<style>
html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}
</style>
