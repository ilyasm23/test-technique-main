import Vuex from 'vuex';
import { authenticationModule } from './authentication/authentication';
import { RootState } from './types';
// import { Store } from 'vuex';
// import { InjectionKey } from 'vue';
// import { ProfileState } from './authentication/authentication-types';

export const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: {
    authenticationModule,
  },
});

// export const authenticationKey: InjectionKey<Store<ProfileState>> = Symbol();
