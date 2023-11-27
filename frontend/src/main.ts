import { createApp, provide, h } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { axiosInstance as axios } from './axios';
import { store } from './store';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './graphql';
// Vuetify and global components
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/dist/vuetify.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Components for the router
import Login from './components/Login.vue';
import TodoList from './components/TodoList.vue';
import Layout from './layouts/Layout.vue';

const routes = [
  {
    path: '/',
    name: 'todoList',
    components: {
      Layout: Layout,
      default: TodoList,
    },
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if trying to access pages that require authentication
    store
      .dispatch('authenticationModule/verifySession')
      .then(() => {
        next();
      })
      .catch(() => {
        next('/login');
      });
  } else if (to.path === '/login') {
    // Check if trying to access login while already authenticated
    store
      .dispatch('authenticationModule/verifySession')
      .then(() => {
        next('/'); // Redirect to main page or dashboard (todos page is the only other page here)
      })
      .catch(() => {
        next(); // User is not authenticated, proceed to login page
      });
  } else {
    // Other routes that might not require verifying the session
    next();
  }
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.component('VueDatePicker', VueDatePicker);

app.use(router);
app.use(vuetify);
app.use(store);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$eventBus = app;
app.mount('#app');
