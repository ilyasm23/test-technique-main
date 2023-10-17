import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { PostgresService } from 'src/postgres.service';

@Injectable()
export class TodosService {
  constructor(private readonly postgresService: PostgresService) {}

  async findAll() {
    const res = await this.postgresService
      .getClient()
      .query('SELECT * FROM todos');
    console.log(res.rows);
    return res.rows;
  }

  //   create(todo: TodoDTO) {
  //     return this.prisma.todo.create({
  //       data: {
  //         title: todo.title,
  //         content: todo.content,
  //         priority: todo.priority,
  //         executionDate: todo.executionDate,
  //       },
  //     });
  //   }

  //   findOne(id: string) {
  //     return this.prisma.todo.findUnique({
  //       where: {
  //         id: parseInt(id, 10),
  //       },
  //     });
  //   }

  //   async remove(id: string) {
  //     try {
  //       const deletedTodo = await this.prisma.todo.delete({
  //         where: {
  //           id: parseInt(id, 10),
  //         },
  //       });
  //       return deletedTodo;
  //     } catch (error) {
  //       throw new NotFoundException('Todo not found');
  //     }
  //   }
}
