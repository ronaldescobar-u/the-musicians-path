<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getSong } from '../services/song.service';
import Song from '../types/Song';

const route = useRoute()
const song = ref<Song>();

onMounted(async () => {
  song.value = await getSong(parseInt(route.params.id as string));
});

function markAsCompleted() {
  completeSongOfCourse(song.id)
}
</script>

<template>
  <div>
    <h1>{{ song.name }}</h1>
    <p>{{  song.artist }}</p>
    <p>{{  song.genre }}</p>
    <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
      Add to my course
    </v-btn>
    <v-btn block @click="markAsCompleted()" variant="elevated" color="indigo-accent-2">
      Mark as completed
    </v-btn>
    <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
      Edit
    </v-btn>
    <div>
      <div v-for="file in song.files">
        <h4>{{ file.fileType }}</h4>
        <div v-if="file.fileTypeId === 1">{{ file.content }}</div>
      </div>
    </div>
  </div>
</template>
