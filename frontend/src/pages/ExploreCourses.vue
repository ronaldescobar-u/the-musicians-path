<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCourses } from '../services/course.service';
import { watch } from 'vue';
import debounce from 'debounce';

const courses = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  courses.value = await getCourses(searchQuery.value);
});

const debouncedSearch = debounce(async () => {
  courses.value = await getCourses(searchQuery.value);
}, 1000);

watch(searchQuery, () => {
  debouncedSearch(searchQuery)
});
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
            Description
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, description } in courses" :key="id">
          <td>{{ name }}</td>
          <td>{{ description }}</td>
          <td>
            <router-link :to="`/course/${id}`">View songs</router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
