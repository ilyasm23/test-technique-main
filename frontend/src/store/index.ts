import Vuex from 'vuex';
import { RootState } from './types';
import { authenticationModule } from './authentication/authentication';
import { todosModule } from './todos/todos';

export const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: {
    authenticationModule,
    todosModule,
  },
});
