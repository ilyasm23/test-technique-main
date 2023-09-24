import { Module } from 'vuex';
import { RootState } from '../types';
import { ProfileState } from './todos-types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: ProfileState = {
  todos: [],
  error: false,
};

const namespaced: boolean = true;

export const todosModule: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
