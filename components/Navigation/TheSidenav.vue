<template>
<b-navbar>
  <b-collapse is-nav id="nav_collapse" class="sidenav bg-info">
    <b-navbar-nav>
      <b-nav-item :to="{name: 'posts'}">Posts</b-nav-item>
      <b-nav-item :to="{name: 'about'}">About</b-nav-item>
      <b-nav-item :to="{name: 'admin'}">Admin</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
  </b-navbar>
</template>