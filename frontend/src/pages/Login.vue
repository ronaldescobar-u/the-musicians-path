<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const passwordVisible = ref(false);

function login() {
  axios.post('http://localhost:3001/authentication', { email: email.value, password: password.value });
}
</script>
<template>
  <div class="bg-indigo-accent-2 h-screen py-10">
    <v-card class="mx-auto px-6 py-4" max-width="450">
      <v-card-title class="font-weight-bold">
        Login
      </v-card-title>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'text' : 'password'" @click:append-inner="passwordVisible = !passwordVisible"
        label="Password">
      </v-text-field>
      <v-btn block @click="login" variant="elevated" color="indigo-accent-2">
        Login
      </v-btn>
      <p class="text-center mt-4 mb-2">Dont have an account yet? <router-link to='/register'>Sign up</router-link></p>
    </v-card>
  </div>
</template>
