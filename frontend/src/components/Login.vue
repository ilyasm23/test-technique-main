<template>
  <v-container class="login-container pa-0" fluid>
    <v-row class="d-flex align-center h-100">
      <v-col class="d-flex justify-center align-center h-100" cols="12">
        <v-card class="form-container pa-3">
          <h2 class="login-title">Connexion</h2>
          <v-form @submit.prevent="postLogin">
            <v-text-field
              v-model="loginCredentials.email"
              autocomplete="email"
              name="email"
              type="text"
              variant="underlined"
              clearable
              required
              class="input-required"
            >
              <template #label>
                <span> Email* </span>
              </template>
            </v-text-field>

            <v-text-field
              v-model="loginCredentials.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              name="password"
              variant="underlined"
              clearable
              required
              class="input-required"
              @click:append="showPassword = !showPassword"
            >
              <template #label>
                <span> Mot de passe* </span>
              </template>
            </v-text-field>
            <div class="d-flex justify-end">
              <v-btn
                type="submit"
                :disabled="
                  !(loginCredentials.password && loginCredentials.email)
                "
                :loading="formLoading"
                color="#A18276"
                style="color: white"
              >
                Connecter
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import { store } from '../store/index';
import { useRouter } from 'vue-router';

interface LoginCredentials {
  email: string | null;
  password: string | null;
}

export default {
  name: 'LoginComponent',
  setup() {
    const formLoading = ref(false);
    const showPassword = ref(false);
    const loginCredentials = ref<LoginCredentials>({
      email: null,
      password: null,
    });

    const router = useRouter();

    const postLogin = async () => {
      formLoading.value = true;
      try {
        store
          .dispatch('authenticationModule/login', loginCredentials.value)
          .then(() => {
            router.push('/');
          })
          .catch(() => {
            //TODO : Replace this with a notification handler
            console.log('Failed to login...');
          });
        formLoading.value = false;
      } catch (error) {
        formLoading.value = false;
      }
    };

    return {
      formLoading,
      showPassword,
      loginCredentials,
      postLogin,
    };
  },
};
</script>

<style>
.login-container {
  width: 100vw;
  height: 100vh;
}

.form-container {
  width: 500px;
  height: 250px;
}

.login-title {
  text-transform: uppercase;
  color: #a18276;
}
</style>
