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
export default {
  name: 'LayoutComponent',
  setup() {
    const handleLogout = (): void => {
      console.log('Logging out...');
    };
    return { handleLogout };
  },
};
</script>

<style></style>
