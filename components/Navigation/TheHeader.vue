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
</b-navbar>
</div>
</template>