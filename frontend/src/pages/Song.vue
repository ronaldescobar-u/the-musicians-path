<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getSong } from '../services/song.service';
import Song from '../types/Song';
import SongModal from '../components/SongModal.vue';

const route = useRoute()
const song = ref<Song>();
const isModalOpen = ref(false);

onMounted(async () => {
  song.value = await getSong(parseInt(route.params.id as string));
});

function markAsCompleted() {
  completeSongOfCourse(song.id)
}

function openEditSongModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <div v-if="song">
    <h1>{{ song.name }}</h1>
    <p>{{ song.artist }}</p>
    <p>{{ song.genre }}</p>
    <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
      Add to my course
    </v-btn>
    <v-btn block @click="markAsCompleted" variant="elevated" color="indigo-accent-2">
      Mark as completed
    </v-btn>
    <v-btn block @click="openEditSongModal" variant="elevated" color="indigo-accent-2">
      Edit
    </v-btn>
    <div>
      <div v-for="file in song.files">
        <div v-if="file.fileTypeId === 1">{{ file.content }}</div>
        <a v-if="file.fileTypeId === 2" :href="file.content">{{ file.fileType }}</a>
        <h4 v-if="file.fileTypeId === 3">File - {{ file.content }}</h4>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
  <SongModal :isOpen="isModalOpen" :isCreate="false" :close="closeModal" />
</template>
