<script setup lang="ts">
import { ref } from 'vue';
import { createUser } from '../services/user.service';
import { useRouter } from 'vue-router';
import tokenUtils from '../utils/token'

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const passwordVisible = ref(false);
const confirmPassword = ref('');
const confirmPasswordVisible = ref(false);
const errorMessage = ref('');

async function signUp() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
  }
  try {
    const { accessToken, refreshToken } = await createUser(firstName.value, lastName.value, email.value, password.value);
    tokenUtils.saveTokens(accessToken, refreshToken);
    store.setUser(null);
    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.message;
  }  
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
      <p>{{ errorMessage }}</p>
      <v-btn block @click="signUp" variant="elevated" color="indigo-accent-2">
        Sign up
      </v-btn>
      <p class="text-center mt-4 mb-2">Already have an account? <router-link to='/login'>Login</router-link></p>
    </v-card>
  </div>
</template>
