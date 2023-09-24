<template>
  <v-container
    class="todo-list-container d-flex flex-column justify-space-between"
  >
    <v-row>
      <v-col>
        <v-row v-for="todo in displayedTodos" :key="todo.id">
          <v-col>
            <br />
            <TodoComponent :todo="todo" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="buttons-row">
      <v-col class="d-flex justify-space-between align-center" cols="12">
        <v-btn @click="todoCreation = true" class="bg-green">
          Ajouter une tâche
        </v-btn>
        <v-pagination v-model="currentPage" :length="todosCount"></v-pagination>
      </v-col>
    </v-row>
    <!-- //TODO : Transfer the content of the dialog in another component -->
    <!-- the same way I divided TodoComponent and TodoList -->
    <v-dialog v-model="todoCreation" width="400">
      <v-card class="todo-creation-dialog">
        <v-card-title class="d-flex justify-space-between align-center">
          <div>Création d'une tâche</div>
          <v-btn icon="mdi-close" elevation="0" @click="handleCloseDialog" />
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createTodo" class="h-100">
            <v-row class="h-100">
              <v-col class="h-100 d-flex flex-column">
                <div>
                  <v-text-field
                    v-model="formValues.title"
                    :rules="titleRules"
                    label="Titre*"
                    variant="outlined"
                    required
                    density="compact"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    v-model="formValues.content"
                    :rules="contentRules"
                    label="Contenu*"
                    variant="outlined"
                    required
                    density="compact"
                  ></v-text-field>
                </div>
                <div>
                  <v-select
                    label="Priorité*"
                    v-model="formValues.priority"
                    :rules="priorityRules"
                    :items="priorityItems"
                    item-title="fr"
                    item-value="en"
                    variant="outlined"
                    required
                    density="compact"
                  ></v-select>
                </div>
                <div>
                  Ajouter une date d'exécution (facultatif) :
                  <VueDatePicker
                    v-model="formValues.executionDate"
                    text-input
                    utc
                    ref="datepicker"
                  />
                </div>
                <br />
                <div>
                  <v-btn type="submit" block class="mb-2 bg-green" height="50"
                    >Créer la tâche
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import { store } from '../store/index';
import { TodoForm, Todo } from '../store/todos/todos-types';
import TodoComponent from './TodoComponent.vue';

interface PriorityItem {
  fr: string;
  en: string;
}

export default {
  name: 'TodoList',
  components: { TodoComponent },
  setup() {
    const priorityItems = ref<PriorityItem[]>([
      { fr: 'haute', en: 'high' },
      { fr: 'moyenne', en: 'medium' },
      { fr: 'basse', en: 'low' },
    ]);
    // Used for the pagination
    const itemsPerPage = ref<number>(5);
    const currentPage = ref<number>(1);
    // Defines the status of the v-dialog (open/closed)
    const todoCreation = ref<boolean>(false);

    const formValues = ref<TodoForm>({
      title: null,
      content: null,
      priority: null,
      executionDate: null,
    });

    const titleRules = [
      (v: string) => !!v || 'Le titre ne peut pas être vide.',
      (v: string) =>
        (v.length && v.length <= 50) ||
        'Le titre doit contenir moins de 50 caractères.',
    ];

    const contentRules = [
      (v: string) => !!v || 'Le contenu ne peut pas être vide.',
      (v: string) =>
        (v.length && v.length <= 256) ||
        'Le contenu doit contenir moins de 256 caractères.',
    ];

    const priorityRules = [
      (v: string) => !!v || 'Veuillez sélectionner une priorité.',
    ];

    // Methods
    const handleCloseDialog = (): void => {
      todoCreation.value = false;
      clearFormValues();
    };

    const clearFormValues = (): void => {
      formValues.value = {
        title: null,
        content: null,
        executionDate: null,
        priority: null,
      };
    };

    const createTodo = (): void => {
      if (!formValues.value.title || formValues.value.title.length > 50) return;
      if (!formValues.value.content || formValues.value.content.length > 256)
        return;
      if (!formValues.value.priority) return;
      //TODO : Add notifications above instead of only returning

      store
        .dispatch('todosModule/createTodo', formValues.value)
        .then(() => {
          //TODO : Handle notifications here
          console.log('Todo successfully created...');
          handleCloseDialog();
        })
        .catch(() => {
          console.log('Error while creating Todo...');
        });
    };

    const todos = computed<Todo[]>(() => {
      return store.getters['todosModule/getTodos'];
    });

    const todosCount = computed(() => {
      return Math.ceil(todos.value.length / itemsPerPage.value);
    });

    /**
     * Handles displaying the right amount of TODOs per page (used for the pagination).
     */
    const displayedTodos = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return todos.value.slice(start, end);
    });

    onMounted(() => {
      store.dispatch('todosModule/fetchTodos');
    });

    return {
      todos,
      displayedTodos,
      todoCreation,
      priorityItems,
      formValues,
      titleRules,
      contentRules,
      priorityRules,
      todosCount,
      currentPage,
      handleCloseDialog,
      createTodo,
    };
  },
};
</script>
<style>
.todo-list-container {
  height: 90vh;
}

.buttons-row {
  max-height: 100px;
}
.todo-creation-dialog {
  width: 450px;
  height: 440px;
}
</style>
