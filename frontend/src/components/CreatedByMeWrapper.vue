<script setup lang="ts">
import { useRoute } from 'vue-router';

const { name } = useRoute();
</script>
<template>
  <div class="px-10 py-4">
    <h2 class="text-center">{{ name }} created by me</h2>
    <div>
      <router-view />
    </div>
  </div>
</template>
