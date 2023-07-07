<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { enrollUserToCourse, getCourse } from '../services/course.service';
import Course from '../types/Course';

const route = useRoute()
const course = ref<Course>();

onMounted(async () => {
  course.value = await getCourse(parseInt(route.params.id as string));
});

function enroll() {
  enrollUserToCourse(course.id)
}
</script>

<template>
  <div v-if="course">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>
    <v-btn block @click="enroll" variant="elevated" color="indigo-accent-2">
      Enroll
    </v-btn>
    <v-btn block @click="markAsCompleted()" variant="elevated" color="indigo-accent-2">
      Mark as completed
    </v-btn>
    <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
      Edit
    </v-btn>
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
  <div v-else>
    Loading...
  </div>
</template>
