import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoPayload } from './todo.model';
import { PostgresService } from 'src/postgres.service';

@Injectable()
export class TodosService {
  constructor(private readonly postgresService: PostgresService) {}

  async findAll() {
    const res = await this.postgresService
      .getClient()
      .query('SELECT * FROM todos');
    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.postgresService
      .getClient()
      .query({ text: 'SELECT * FROM todos WHERE id = $1', values: [id] });
    return res.rows[0];
  }

  async create(todoData: TodoPayload) {
    const { title, content, priority, execution_date } = todoData;
    const resCreation = await this.postgresService.getClient().query({
      text: `
        INSERT INTO todos (title, content, priority, execution_date) 
        VALUES ($1, $2, $3, $4) RETURNING (id);
      `,
      values: [title, content, priority, execution_date],
    });
    console.log(resCreation);
    let res;
    if (resCreation.rows.length == 1) {
      res = await this.postgresService.getClient().query({
        text: `
          SELECT * FROM todos WHERE id = $1
        `,
        values: [resCreation.rows[0].id],
      });
    }

    return res.rows[0];
  }

  async remove(id: number) {
    console.log(id);
    const deletedTodo = await this.postgresService.getClient().query({
      text: `
          DELETE FROM todos WHERE id = $1
        `,
      values: [id],
    });
    console.log(deletedTodo);
    if (deletedTodo.rowCount == 1) return 'Deleted successfully';
    else return 'An error occurred while deleting';
  }
}
