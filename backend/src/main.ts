import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // O CORS totalmente aberto como fizemos antes

  // 👇 Esta é a linha crítica! 
  await app.listen(3333, '0.0.0.0'); 
}
bootstrap();