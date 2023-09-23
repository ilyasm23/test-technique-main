import { Module } from 'vuex';
import { RootState } from '../types';
import { ProfileState } from './authentication-types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: ProfileState = {
  authentication: undefined,
  error: false,
};

const namespaced: boolean = true;

export const authenticationModule: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
