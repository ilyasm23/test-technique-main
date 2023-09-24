import { GetterTree } from 'vuex';
import { ProfileState, Todos } from './todos-types';
import { RootState } from '../types';

export const getters: GetterTree<ProfileState, RootState> = {
  getTodos(state): Todos | [] {
    const { todos } = state;
    return todos;
  },
};
