<template>
  <v-card>
    <v-card-text class="px-3">
      <v-row>
        <v-col cols="12" sm="9">
          <h2 class="todo-title d-flex justify-space-between">
            <h3>{{ todo.title }}</h3>
          </h2>
          <p class="content mt-2">{{ todo.content }}</p>
          <br />
          <p v-if="todo.executionDate" class="execution-date font-weight-bold">
            Le {{ formatDate(todo.executionDate) }}
          </p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          class="d-flex flex-sm-column flex-row-reverse justify-space-between align-end"
        >
          <v-btn
            @click="deleteTodo(todo.id)"
            variant="outlined"
            class="text-red"
          >
            Supprimer
          </v-btn>
          <p class="priority">
            Priorité {{ translatePriority(todo.priority) }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { translatePriority } from '../utils/functions';
import { store } from '../store/index';
import { Todo } from '../store/todos/todos-types';

export default {
  name: 'TodoComponent',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup() {
    const deleteTodo = (id: number): void => {
      store
        .dispatch('todosModule/deleteTodo', id)
        .then(() => {
          // TODO : Handle notifications here
          console.log('Deleted Todo: ' + id);
        })
        .catch(() => {
          console.log('Error while deleting Todo: ' + id);
        });
    };

    /**
     * Transforms a ISO 8601 dateString into a date string with
     * the format "dd/mm/yyyy à hh:mm".
     */
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);

      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} à ${hours}:${minutes}`;
    };

    return {
      deleteTodo,
      translatePriority,
      formatDate,
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
  color: #ff5733;
}

.execution-date {
  color: #01579b;
}
</style>
