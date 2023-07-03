import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import ExploreWrapper from './components/ExploreWrapper.vue';
import ExploreCourses from './pages/ExploreCourses.vue';
import ExploreSongs from './pages/ExploreSongs.vue';
import CreatedByMeWrapper from './components/CreatedByMeWrapper.vue';
import CoursesCreatedByMe from './pages/CoursesCreatedByMe.vue';
import SongsCreatedByMe from './pages/SongsCreatedByMe.vue';
import * as VueRouter from 'vue-router';
import { mdi } from 'vuetify/iconsets/mdi'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  
  {
    path: '/explore', component: ExploreWrapper, children: [
      { path: 'courses', name: 'courses', component: ExploreCourses },
      { path: 'songs', name: 'songs', component: ExploreSongs }
    ]
  },
  {
    path: '/created-by-me', component: CreatedByMeWrapper, children: [
      { path: 'courses', name: 'Courses', component: CoursesCreatedByMe },
      { path: 'songs', name: 'Songs', component: SongsCreatedByMe }
    ]
  }
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
