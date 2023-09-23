import { GetterTree } from 'vuex';
import { ProfileState, Authentication } from './authentication-types';
import { RootState } from '../types';

export const getters: GetterTree<ProfileState, RootState> = {
  getAuth(state): Authentication | undefined {
    const { authentication } = state;
    return authentication;
  },
};
