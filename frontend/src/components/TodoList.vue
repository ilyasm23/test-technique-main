<template>
  <v-container>
    <v-row v-for="todo in todos" :key="todo.id">
      <v-col>
        <br />
        <TodoComponent :todo="todo" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="6">
        <v-btn @click="todoCreation = true" class="bg-green">
          Ajouter une tâche
        </v-btn>
        <div>Pagination</div>
      </v-col>
    </v-row>
    <!-- //TODO : Transfer the content of the dialog in another component -->
    <!-- the same way I did with TodoComponent and TodoList -->
    <v-dialog v-model="todoCreation" width="400">
      <v-card class="todo-creation-dialog">
        <v-card-title class="d-flex justify-space-between align-center">
          <div>Création d'une tâche</div>
          <v-btn
            class="user-info-close-icon"
            icon="mdi-close"
            elevation="0"
            @click="handleCloseDialog"
          />
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
import { ref } from 'vue';
import TodoComponent from './TodoComponent.vue';

interface FormValues {
  title: string | null;
  content: string | null;
  executionDate: string | null;
  priority: string | null;
}

interface PriorityItem {
  fr: string;
  en: string;
}

export default {
  name: 'TodoList',
  components: { TodoComponent },
  setup() {
    // Data
    const todos = ref([
      {
        id: 1,
        title: 'Learn Vue 3',
        content: 'Vue 3 course',
        priority: 'high',
        executionDate: '2023-09-26',
      },
      {
        id: 2,
        title: 'Complete Project Proposal',
        content: 'Prepare and submit the project proposal document.',
        priority: 'medium',
        executionDate: '2023-09-28',
      },
      {
        id: 3,
        title: 'Meeting with Client',
        content: 'Discuss project requirements and timelines with the client.',
        priority: 'high',
        executionDate: '2023-09-27',
      },
      {
        id: 4,
        title: 'Update Portfolio',
        content: 'Add recent projects to the portfolio website.',
        priority: 'low',
        executionDate: '2023-09-30',
      },
    ]);

    // Defines the status of the v-dialog (open/closed)
    const todoCreation = ref<boolean>(false);
    const priorityItems = ref<PriorityItem[]>([
      { fr: 'haute', en: 'high' },
      { fr: 'moyenne', en: 'medium' },
      { fr: 'basse', en: 'low' },
    ]);

    const formValues = ref<FormValues>({
      title: null,
      content: null,
      executionDate: null,
      priority: null,
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
      //TODO : Add notifications instead of the simple "return"
      if (!formValues.value.title || formValues.value.title.length > 50) return;
      if (!formValues.value.content || formValues.value.content.length > 256)
        return;
      if (!formValues.value.priority) return;

      console.log('Submitting form to backend...');
      console.log(formValues.value);
    };

    return {
      todos,
      todoCreation,
      priorityItems,
      formValues,
      titleRules,
      contentRules,
      priorityRules,
      handleCloseDialog,
      createTodo,
    };
  },
};
</script>
<style>
.todo-creation-dialog {
  width: 450px;
  height: 440px;
}
</style>
