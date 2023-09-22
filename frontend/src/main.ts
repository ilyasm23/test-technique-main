import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import TodoList from "./components/TodoList.vue";
import Layout from "./layouts/Layout.vue";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "vuetify/dist/vuetify.min.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const routes = [
  {
    path: "/",
    components: {
      Layout: Layout,
      default: TodoList,
    },
  },
  { path: "/login", name: "login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);

app.use(router);
app.use(vuetify);
app.mount("#app");
