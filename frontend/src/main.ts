import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import * as VueRouter from 'vue-router';
import { mdi } from 'vuetify/iconsets/mdi'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).use(router).mount('#app');
