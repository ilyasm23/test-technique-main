import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PostgresService {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.PGHOSTADDR,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    });
    this.client.connect();
  }

  getClient(): Client {
    return this.client;
  }
}
