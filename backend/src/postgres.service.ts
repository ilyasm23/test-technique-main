import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PostgresService {
  private client: Client;

  constructor() {
    this.client = new Client();
    this.client.connect();
  }

  getClient(): Client {
    return this.client;
  }
}
