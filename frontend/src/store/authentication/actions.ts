import { ActionTree, ActionContext } from 'vuex';
import {
  ProfileState,
  AuthenticationCredentials,
} from './authentication-types';
import { RootState } from '../types';
import { cookies } from '@/utils/cookies';
import {
  axiosInstance as axios,
  setToken as setAxiosToken,
  removeToken as removeAxiosToken,
} from '../../axios';

export const actions: ActionTree<ProfileState, RootState> = {
  /**
   * Checks if there's a token in the cookies. If not, returns reject();
   * If there is one, sends a request to the server (/token) to verify
   * if the token is valid. If not, returns reject();
   * If there is a token AND it's valid, returns resolve();
   */
  verifySession({ dispatch, commit }: ActionContext<ProfileState, RootState>) {
    return new Promise((resolve, reject) => {
      const cookiesToken = cookies.get('token');
      if (!cookiesToken) {
        cookies.remove('token'); // just in case
        removeAxiosToken();
        commit('CLEAR_AUTH');
        return reject();
      }
      dispatch('verifyToken', cookiesToken)
        .then(() => {
          // The token is valid : add it again to axios config just in case
          setAxiosToken(cookiesToken);
          return resolve('Token is valid');
        })
        .catch(() => {
          // If not valid, logout
          cookies.remove('token'); // just in case
          removeAxiosToken();
          commit('CLEAR_AUTH');
          return reject();
        });
    });
  },
  /**
   * Used in verifySession()
   */
  verifyToken(context: ActionContext<ProfileState, RootState>, token: string) {
    return axios
      .get('/token', {
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
  /**
   * Sends a Post login request to the server. If the login is
   * successful, the returned token is set in the cookies and added
   * to axios' configuration.
   */
  login(
    context: ActionContext<ProfileState, RootState>,
    credentials: AuthenticationCredentials,
  ) {
    return axios
      .post('/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        setAxiosToken(response.data.access_token);
        cookies.set('token', response.data.access_token);
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  /**
   * Logs out the user and clears the token cookie and axios' Authorization header's
   * configuration.
   */
  logout() {
    return new Promise((resolve, reject) => {
      try {
        setAxiosToken('');
        cookies.remove('token');
        return resolve('Logout successful');
      } catch (error) {
        return reject(error);
      }
    });
  },
};
