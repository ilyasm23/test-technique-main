import { MutationTree } from 'vuex';
import { ProfileState, Todos } from './todos-types';

export const mutations: MutationTree<ProfileState> = {
  SET_TODOS(state, payload: Todos) {
    state.error = false;
    state.todos = payload;
  },
};
