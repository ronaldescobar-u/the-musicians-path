<template>
  <h3>Register</h3>
  <v-text-field label="First name"></v-text-field>
  <v-text-field label="Last name"></v-text-field>
  <v-text-field label="Email"></v-text-field>
  <v-text-field label="Password"></v-text-field>
  <v-text-field label="Confirm password"></v-text-field>
  <v-btn>
    Sign up
  </v-btn>
  <p>Already have an account? <router-link to='/register'>Login</router-link></p>
</template>
