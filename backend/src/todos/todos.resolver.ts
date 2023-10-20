import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { TodoModel, TodoPayload } from './todo.model';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query((returns) => [TodoModel])
  async todos(): Promise<TodoModel[]> {
    return await this.todoService.findAll();
  }

  @Query((returns) => TodoModel)
  async todo(@Args('id', { type: () => Int }) id: number): Promise<TodoModel> {
    return await this.todoService.findOne(id);
  }

  @Mutation((returns) => TodoModel)
  async createTodo(@Args('TodoData') todoData: TodoPayload) {
    return await this.todoService.create(todoData);
  }

  @Mutation((returns) => String)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.remove(id);
  }
}
