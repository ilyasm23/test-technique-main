import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from '../prisma.service';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { TodoDTO } from './entities/todo.dto';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService, PrismaService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  //TODO : Go through the tests again as they don't fully test the controller yet but only mocked values and methods.

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      const result = [
        {
          id: 1,
          title: 'Test title',
          content: 'Test content',
          priority: 'Test priority',
          executionDate: new Date('2023-09-25T14:00:00.000Z'),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.getAllTodos()).toEqual(result);
    });
  });

  describe('getTodoById', () => {
    it('should return one todo', async () => {
      const result = {
        id: 1,
        title: 'Test title',
        content: 'Test content',
        priority: 'Test priority',
        executionDate: new Date('2023-09-25T14:00:00.000Z'),
      };
      jest.spyOn(service, 'findOne').mockImplementation((id: string) => {
        if (id === '1') {
          return result as any;
        } else {
          return new NotFoundException() as any;
        }
      });

      expect(await controller.getTodoById('1')).toEqual(result);
      expect(await controller.getTodoById('2')).toEqual(
        new NotFoundException()
      );
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const inputTodo: TodoDTO = {
        title: 'Test title',
        content: 'Test content',
        priority: 'Test priority',
        executionDate: '2023-09-25T14:00:00.000Z',
      };

      const resultTodo = {
        id: 1,
        title: 'Test title',
        content: 'Test content',
        priority: 'Test priority',
        executionDate: new Date(inputTodo.executionDate),
      };

      jest.spyOn(service, 'create').mockImplementation((todo): any => {
        expect(todo).toEqual(inputTodo);
        return Promise.resolve(resultTodo);
      });

      const response = await controller.createTodo(inputTodo);
      expect(response).toEqual(resultTodo);
    });

    it('should throw an error when creating a new todo', async () => {
      const inputTodo: TodoDTO = {
        title: 'Test title',
        content: 'Test content',
        priority: 'Test priority',
        executionDate: '2023-09-25',
      };

      jest.spyOn(service, 'create').mockImplementation((todo): any => {
        expect(todo).toEqual(inputTodo);
        return new BadRequestException(
          'The executionDate must be in the ISO 8601 format and must include the time (2023-09-25T14:00:00.000Z).'
        );
      });

      const response = await controller.createTodo(inputTodo);
      expect(response).toEqual(
        new BadRequestException(
          'The executionDate must be in the ISO 8601 format and must include the time (2023-09-25T14:00:00.000Z).'
        )
      );
    });
  });
});
