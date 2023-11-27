import { ActionTree, ActionContext } from 'vuex';
import { ProfileState } from './todos-types';
import { RootState } from '../types';
import { TodoForm } from './todos-types';
import apolloClient from '../../graphql';
import gql from 'graphql-tag';

export const actions: ActionTree<ProfileState, RootState> = {
  fetchTodos(context: ActionContext<ProfileState, RootState>) {
    return apolloClient
      .query({
        query: gql`
          query {
            todos {
              id
              title
              content
              priority
              execution_date
            }
          }
        `,
      })
      .then((response) => {
        context.commit('SET_TODOS', response.data.todos);
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
    return apolloClient
      .mutate({
        mutation: gql`
          mutation createTodo($todo: TodoPayload!) {
            createTodo(TodoData: $todo) {
              id
              title
              content
              priority
              execution_date
            }
          }
        `,
        variables: {
          todo: {
            title: todo.title,
            content: todo.content,
            priority: todo.priority,
            execution_date: todo.executionDate,
          },
        },
      })
      .then((response) => {
        dispatch('fetchTodos');
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  deleteTodo({ dispatch }: ActionContext<ProfileState, RootState>, id: number) {
    return apolloClient
      .mutate({
        mutation: gql`
          mutation deleteTodo($id: Int!) {
            deleteTodo(id: $id)
          }
        `,
        variables: {
          id: id,
        },
      })
      .then((response) => {
        dispatch('fetchTodos');
        return Promise.resolve(response);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
};
