<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createSong } from '../services/song.service';
import { getArtists } from '../services/artist.service';
import { getGenres } from '../services/genre.service';

defineProps<{ isCreate: boolean, isOpen: boolean, close: () => void }>();

const name = ref('');
const artists = ref([]);
const artistSelected = ref('');
const genres = ref([]);
const genreSelected = ref('');
const difficulty = ref('');

onMounted(async () => {
  Promise.all([getArtists(), getGenres()]).then(([artistsResponse, genresResponse]) => {
    artists.value = artistsResponse;
    genres.value = genresResponse;
  });
});

function submit() {
  createSong(name.value, artistSelected.value, genreSelected.value, difficulty.value);
  close();
}
</script>
<template>
  <v-dialog v-model="isOpen">
    <v-card class="mx-auto px-6 py-4" max-width="450">
      <v-card-title class="font-weight-bold">
        {{ isCreate ? 'Create' : 'Update' }} course
      </v-card-title>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-select label="Artist" :items="artists" item-title="name" item-value="id" v-model="artistSelected"></v-select>
      <v-select label="Genre" :items="genres" item-title="name" item-value="id" v-model="genreSelected"></v-select>
      <v-text-field type="number" v-model="difficulty" label="Difficulty"></v-text-field>
      <v-btn block @click="close" variant="elevated" color="indigo-accent-2">
        Close
      </v-btn>
      <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
        {{ isCreate ? 'Create' : 'Update' }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>
