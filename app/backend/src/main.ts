import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3333;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();
