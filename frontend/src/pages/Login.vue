<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

defineProps<{ msg: string }>()

const email = ref('');
const password = ref('');

function login() {
axios.post('', {})
}
</script>
<template>
  <h3>Login</h3>
  <v-text-field v-model="email" label="Email"></v-text-field>
  <v-text-field v-model="password" type="password" label="Password"></v-text-field>
  <v-btn @click="login">
    Login
  </v-btn>
  <p>Dont have an account yet? <router-link to='/register'>Sign up</router-link></p>
</template>
