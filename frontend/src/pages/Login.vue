<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../services/user.service';
import { useRouter } from 'vue-router';
import tokenUtils from '../utils/token'
import useUserStore from '../stores/userStore';

const router = useRouter();
const store = useUserStore();
const email = ref('');
const password = ref('');
const passwordVisible = ref(false);
const errorMessage = ref('');

async function submit() {
  try {
    const { accessToken, refreshToken } = await login(email.value, password.value);
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
        Login
      </v-card-title>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'text' : 'password'" @click:append-inner="passwordVisible = !passwordVisible"
        label="Password">
      </v-text-field>
      <p>{{ errorMessage }}</p>
      <v-btn block @click="submit" variant="elevated" color="indigo-accent-2">
        Login
      </v-btn>
      <p class="text-center mt-4 mb-2">Dont have an account yet? <router-link to='/register'>Sign up</router-link></p>
    </v-card>
  </div>
</template>
