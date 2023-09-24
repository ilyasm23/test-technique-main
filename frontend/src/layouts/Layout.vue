<template>
  <v-toolbar density="comfortable" title="Une TODO app pas comme les autres">
    <v-btn
      append-icon="mdi-logout"
      variant="text"
      elevation="0"
      @click="handleLogout"
    >
      Déconnexion
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { store } from '../store/index';

export default {
  name: 'LayoutComponent',
  setup() {
    const router = useRouter();
    const handleLogout = (): void => {
      store
        .dispatch('authenticationModule/logout')
        .then(() => {
          router.push('/login');
        })
        .catch(() => {
          //TODO : Replace this with a notification handler
          console.log('Failed to logout...');
        });
    };
    return { handleLogout };
  },
};
</script>

<style></style>
