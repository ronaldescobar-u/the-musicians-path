<script setup lang="ts">
</script>
<template>
  <div>
    <div>
      <router-link to="/explore/courses"></router-link>
      <router-link to="/explore/songs"></router-link>
      <router-link to="/created-by-me/courses"></router-link>
      <router-link to="/created-by-me/songs"></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
