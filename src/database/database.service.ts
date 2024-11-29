import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false, // This is required for some cloud DB providers to accept the SSL connection
      },
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL');
    } catch (err) {
      console.error('Error connecting to PostgreSQL', err);
    }
  }

  // Method to query the database
  async query(queryText: string, params?: any[]) {
    try {
      const res = await this.client.query(queryText, params);
      return res.rows; // Returns the result of the query
    } catch (err) {
      console.error('Error executing query', err);
      throw err;
    }
  }

  // Method to disconnect from the database
  async disconnect() {
    try {
      await this.client.end();
      console.log('Disconnected from PostgreSQL');
    } catch (err) {
      console.error('Error disconnecting from PostgreSQL', err);
    }
  }
}
