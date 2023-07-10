<script setup lang="ts">
import { ref } from 'vue';
import { createCourse } from '../services/course.service';

defineProps<{ isCreate: boolean, isOpen: boolean, close: () => void }>();

const name = ref('');
const description = ref('');

function submit() {
  createCourse(name.value, description.value);
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
      <v-textarea v-model="description" label="Description"></v-textarea>
      <v-btn block @click="close" variant="elevated" color="indigo-accent-2">
        Close
      </v-btn>
      <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
        {{ isCreate ? 'Create' : 'Update' }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>
