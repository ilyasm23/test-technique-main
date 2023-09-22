<template>
  <v-card>
    <v-card-title class="todo-title d-flex justify-space-between">
      <h3>{{ todo.title }}</h3>
      <v-btn @click="deleteTodo(todo.id)" variant="outlined" class="text-red">
        Supprimer
      </v-btn>
    </v-card-title>
    <v-card-text class="px-3">
      <v-row>
        <v-col cols="10">
          <p class="content">{{ todo.content }}</p>
          <br />
          <p v-if="todo.executionDate" class="execution-date font-weight-bold">
            <!-- //TODO : Mettre la date au format français -->
            Date d'éxécution: {{ todo.executionDate }}
          </p>
        </v-col>
        <v-col cols="2" class="d-flex justify-end align-end">
          <p class="priority">
            Priorité {{ translatePriority(todo.priority) }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from "vue";
import { translatePriority } from "../utils/functions";

interface Todo {
  id: string;
  title: string;
  content: string;
  priority: string;
  executionDate?: string;
}

export default {
  name: "TodoComponent",
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup() {
    const deleteTodo = (id: number): void => {
      console.log("Deleted Todo: " + id);
    };

    return {
      deleteTodo,
      translatePriority,
    };
  },
};
</script>

<style scoped>
.todo-title {
  color: #a18276;
}
.priority {
  font-weight: bold;
  color: #ff5733; /* Vous pouvez définir des couleurs pour différentes priorités */
}

.execution-date {
  color: #01579b;
}
</style>
