import { MutationTree } from 'vuex';
import { ProfileState, Authentication } from './authentication-types';

export const mutations: MutationTree<ProfileState> = {
  SET_AUTH(state, payload: Authentication) {
    state.error = false;
    state.authentication = payload;
  },
  CLEAR_AUTH(state) {
    state.error = true;
    state.authentication = undefined;
  },
};
