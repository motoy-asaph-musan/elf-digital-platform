import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
bootstrap();

const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
});
await app.listen(3000);