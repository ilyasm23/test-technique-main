import { ActionTree, ActionContext } from 'vuex';
import { ProfileState } from './todos-types';
import { RootState } from '../types';
import { axiosInstance as axios } from '../../axios';
import { TodoForm } from './todos-types';

export const actions: ActionTree<ProfileState, RootState> = {
  fetchTodos(context: ActionContext<ProfileState, RootState>) {
    return axios
      .get('/todos')
      .then((response) => {
        context.commit('SET_TODOS', response.data);
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  createTodo(
    { dispatch }: ActionContext<ProfileState, RootState>,
    todo: TodoForm,
  ) {
    return axios
      .post('/todos', todo)
      .then((response) => {
        dispatch('fetchTodos');
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  deleteTodo({ dispatch }: ActionContext<ProfileState, RootState>, id: number) {
    return axios
      .delete(`/todos/${id}`)
      .then((response) => {
        dispatch('fetchTodos');
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
};
