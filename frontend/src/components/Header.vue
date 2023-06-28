<template>
  <div class="bg-indigo-accent-2 d-flex py-4 px-4 align-center justify-space-between">
    <h2>The Musician's Path</h2>
    <div>
      <router-link to="/">
        <v-btn variant="text">
          My enrolled courses
        </v-btn>
      </router-link>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props">
            Explore
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/explore/courses">Courses</router-link>
            </v-list-item-title>
            <v-list-item-title>
              <router-link to="/explore/songs">Songs</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props">
            Created by me
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/created-by-me/courses">Courses</router-link>
            </v-list-item-title>
            <v-list-item-title>
              <router-link to="/created-by-me/songs">Songs</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" icon="mdi-account" v-bind="props"></v-btn>
        </template>
        <v-card min-width="300">
        <v-list>
          <v-list-item
            title="John Doe"
            subtitle="johndoe@email.com"
          >
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            Update user data
          </v-list-item>
          <v-list-item>
            Logout
          </v-list-item>
        </v-list>
      </v-card>
      </v-menu>
    </div>
  </div>
</template>