import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDTO } from './entities/todo.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany();
  }

  create(todo: TodoDTO) {
    return this.prisma.todo.create({
      data: {
        title: todo.title,
        content: todo.content,
        priority: todo.priority,
        executionDate: todo.executionDate,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.todo.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
  }

  async remove(id: string) {
    try {
      const deletedTodo = await this.prisma.todo.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return deletedTodo;
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }
}
