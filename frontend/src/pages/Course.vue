<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { enrollUserToCourse, getCourse } from '../services/course.service';
import Course from '../types/Course';
import CourseModal from '../components/CourseModal.vue';

const route = useRoute();
const course = ref<Course>();
const isModalOpen = ref(false);

onMounted(async () => {
  course.value = await getCourse(parseInt(route.params.id as string));
});

function enroll() {
  enrollUserToCourse((course.value as Course).id);
}

function promptExitCourse() {
  exitCourse((course.value as Course).id);
}

function openEditCourseModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <div v-if="course">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>
    <v-btn block @click="enroll" variant="elevated" color="indigo-accent-2">
      Enroll
    </v-btn>
    <v-btn block @click="promptExitCourse" variant="elevated" color="indigo-accent-2">
      Exit course
    </v-btn>
    <v-btn block @click="openEditCourseModal" variant="elevated" color="indigo-accent-2">
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
        <tr v-for="{ id, name, artist, genre, difficulty } in course.songs" :key="id">
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
  <CourseModal :isOpen="isModalOpen" :isCreate="false" :close="closeModal" />
</template>
