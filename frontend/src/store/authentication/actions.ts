import { ActionTree, ActionContext } from 'vuex';
import { ProfileState } from './authentication-types';
import { RootState } from '../types';
import { cookies } from '@/utils/cookies';
import {
  axiosInstance as axios,
  setToken as setAxiosToken,
  removeToken as removeAxiosToken,
} from '../../axios';

export const actions: ActionTree<ProfileState, RootState> = {
  verifySession({ dispatch, commit }): void {
    const cookiesToken = cookies.get('token');
    if (!cookiesToken) {
      cookies.remove('token'); // just in case
      removeAxiosToken();
      commit('CLEAR_AUTH');
      console.log('TOKEN NOT IN COOKIES');
      return;
    }
    dispatch('verifyToken', cookiesToken)
      .then(() => {
        // The token is valid : add it again to axios config just in case
        setAxiosToken(cookiesToken);
        dispatch('fetchUserInfo');
        console.log('TOKEN IN COOKIES IS VALID');
      })
      .catch(() => {
        // If not valid, logout
        console.log('TOKEN IN COOKIES IS NOT VALID');
        cookies.remove('token'); // just in case
        removeAxiosToken();
        commit('CLEAR_AUTH');
      });
  },
  verifyToken(context: ActionContext<ProfileState, RootState>, token: string) {
    return axios
      .get('/auth/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  addEmail(context: ActionContext<ProfileState, RootState>, email: string) {
    context.commit('SET_AUTH', { email });
  },
};
