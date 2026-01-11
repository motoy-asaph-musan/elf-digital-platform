import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // UPDATED: Better CORS for Frontend connection
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite (5173) and others
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Needed if you use JWT in cookies later
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API is running on: http://localhost:${port}`);
}
bootstrap();