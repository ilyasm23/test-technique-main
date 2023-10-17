import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { TodoModel } from './todo.model';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query((returns) => [TodoModel])
  async todos(): Promise<TodoModel[]> {
    return await this.todoService.findAll();
  }
}
