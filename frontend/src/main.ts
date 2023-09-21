import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import TodoList from "./components/TodoList.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/todos", component: TodoList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
