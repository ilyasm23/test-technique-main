import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDTO } from './entities/todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async getAllTodos() {
    const todos = await this.todoService.findAll();
    if (!todos || todos.length === 0) throw new NotFoundException();
    return todos;
  }

  @Get(':id')
  async getTodoById(@Param('id', ParseIntPipe) id: string) {
    const todo = await this.todoService.findOne(id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Post()
  createTodo(@Body(new ValidationPipe()) todo: TodoDTO) {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  deleteTodoById(@Param('id', ParseIntPipe) id: string) {
    //TODO : Transfer the error handling here instead of doing it in the service.
    return this.todoService.remove(id);
  }
}
