<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCourses, deleteCourse } from '../services/course.service';
import { watch } from 'vue';
import debounce from 'debounce';
import CourseModal from '../components/CourseModal.vue';

const courses = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const isCreate = ref(true);

onMounted(async () => {
  courses.value = await getCourses(searchQuery.value);
});

const debouncedSearch = debounce(async () => {
  courses.value = await getCourses(searchQuery.value);
}, 1000);

watch(searchQuery, () => {
  debouncedSearch();
});

function openCreateCourseModal() {
  isCreate.value = true;
  isModalOpen.value = true;
}

function openUpdateCourseModal() {
  isCreate.value = false;
  isModalOpen.value = true;
}

function promptDeleteCourse(id: number) {
  if (confirm('Are you sure you want to delete the course?')) {
    deleteCourse(id);
  }
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <div>
    <v-text-field class="my-4" v-model="searchQuery" label="Search"></v-text-field>
    <v-btn block @click="openCreateCourseModal" variant="elevated" color="indigo-accent-2">
      Create course
    </v-btn>
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
            <v-btn block @click="openUpdateCourseModal" variant="elevated" color="indigo-accent-2">
              Update
            </v-btn>
            <v-btn block @click="() => promptDeleteCourse(id)" variant="elevated" color="indigo-accent-2">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <CourseModal :isOpen="isModalOpen" :isCreate="isCreate" :close="closeModal" />
</template>
