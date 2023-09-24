export interface Todo {
  id: number;
  title: string;
  content: string;
  priority: string;
  executionDate?: string;
}

export interface Todos {
  todos: Todo[];
}

export interface TodoForm {
  title: string | null;
  content: string | null;
  priority: string | null;
  executionDate?: string | null;
}

export interface ProfileState {
  todos: Todos | [];
  error: boolean;
}
