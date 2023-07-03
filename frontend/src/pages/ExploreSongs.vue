<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSongs } from '../services/song.service';
import { watch } from 'vue';
import debounce from 'debounce';

const songs = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  songs.value = await getSongs(searchQuery.value);
});

watch(searchQuery, () => {
  debouncedSearch(searchQuery)
});

const debouncedSearch = debounce(async () => {
  songs.value = await getSongs(searchQuery.value);
}, 1000);
</script>

<template>
  <div>
    <v-text-field class="my-4" v-model="searchQuery" label="Search"></v-text-field>
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
