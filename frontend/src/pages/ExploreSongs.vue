<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSongs } from '../services/song.service';
import { watch } from 'vue';
import debounce from 'debounce';
import { getArtists } from '../services/artist.service';
import { getGenres } from '../services/genre.service';

const songs = ref([]);
const artists = ref([]);
const artistSelected = ref('');
const genres = ref([]);
const genreSelected = ref('');
const searchQuery = ref('');

onMounted(async () => {
  Promise.all([getSongs(searchQuery.value), getArtists(), getGenres()]).then(([songsResponse, artistsResponse, genresResponse]) => {
    songs.value = songsResponse;
    artists.value = artistsResponse;
    genres.value = genresResponse;
  })
});

watch(searchQuery, () => {
  debouncedSearch(searchQuery)
});

watch([artistSelected, genreSelected], async () => {
  songs.value = await getSongs(searchQuery.value, artistSelected.value, genreSelected.value);
});

const debouncedSearch = debounce(async () => {
  songs.value = await getSongs(searchQuery.value);
}, 1000);
</script>

<template>
  <div>
    <div>
      <v-text-field class="my-4" v-model="searchQuery" label="Search"></v-text-field>
      <v-select label="Artist" :items="artists" item-title="name" item-value="id" v-model="artistSelected"></v-select>
      <v-select label="Genre" :items="genres" item-title="name" item-value="id" v-model="genreSelected"></v-select>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Artist
          </th>
          <th class="text-left">
            Genre
          </th>
          <th class="text-left">
            Difficulty
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, artist, genre, difficulty } in songs" :key="id">
          <td>{{ name }}</td>
          <td>{{ artist }}</td>
          <td>{{ genre }}</td>
          <td>{{ difficulty }}</td>
          <td>
            <router-link :to="`/song/${id}`">View tabs</router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
