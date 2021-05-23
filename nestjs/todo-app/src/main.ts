import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 入り口
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const sync = configService.get('DB_SYNC');
  console.log(`sync: ${sync}`);
  await app.listen(3000);
}
bootstrap();
