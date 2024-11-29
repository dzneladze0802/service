import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello() {
    return 'hello';
  }
  // This hook will run when the app starts
  async onModuleInit() {
    try {
      await this.databaseService.connect(); // Try connecting to the database
      console.log('App has started and the database is connected.');
    } catch (error) {
      console.error('Failed to connect to the database:', error.message);
    }
  }
}
