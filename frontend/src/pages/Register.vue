<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const passwordVisible = ref(false);
const confirmPassword = ref('');
const confirmPasswordVisible = ref(false);

function signUp() {

}
</script>
<template>
  <div class="bg-indigo-accent-2 h-screen py-10">
    <v-card class="mx-auto px-6 py-4" max-width="450">
      <v-card-title class="font-weight-bold">
        Sign up
      </v-card-title>
      <v-text-field v-model="firstName" label="First name"></v-text-field>
      <v-text-field v-model="lastName" label="Last name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'text' : 'password'"
        @click:append-inner="passwordVisible = !passwordVisible"
        label="Password"
      >
      </v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :append-inner-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="confirmPasswordVisible ? 'text' : 'password'"
        @click:append-inner="confirmPasswordVisible = !confirmPasswordVisible"
        label="Confirm password"
      >
      </v-text-field>
      <v-btn block @click="signUp" variant="elevated" color="indigo-accent-2">
        Sign up
      </v-btn>
      <p class="text-center mt-4 mb-2">Already have an account? <router-link to='/login'>Login</router-link></p>
    </v-card>
  </div>
</template>
