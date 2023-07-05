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

function exitCourse() {
  if (confirm('Are you sure you want to exit the course?')) {

  }
}
</script>

<template>
  <div class="px-10 py-4">
    <h2 class="text-center">My enrolled courses</h2>
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
              <v-btn @click="exitCourse" variant="elevated" color="indigo-accent-2">
                Exit course
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
