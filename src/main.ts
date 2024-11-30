import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // Allow only specific domains
    methods: 'GET,POST,PUT,DELETE', // Allow only specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // All
  });

  await app.listen(3000);
}
bootstrap();
