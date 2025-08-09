import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import envConfig from '../../env.config';

@Injectable()
export class DatabaseService {
  private readonly db;
  constructor() {
    const connectionString = envConfig.DB_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL must be set in .env');
    }
    const sql = postgres(connectionString);
    this.db = drizzle(sql);
  }
  get database() {
    return this.db;
  }
}
