<template>
  <div>LOGIN</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    const todos = ref([
      { id: 1, text: "Learn Vue 3" },
      { id: 2, text: "Build something awesome" },
    ]);

    return {
      todos,
    };
  },
});
</script>
