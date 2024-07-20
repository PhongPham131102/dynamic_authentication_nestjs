import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('SYSTEM');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'verbose', 'warn'],
  });
  app.enableCors({
    origin: [process.env.URL_UI],
    optionsSuccessStatus: 200,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useBodyParser('json', { limit: '80mb' });
  const port = process.env.PORT || 8192;
  await app.listen(port);
  logger.verbose('Hệ thống đang chạy ở cổng ' + port);
}

bootstrap().catch(() => {
  logger.error('Lỗi hệ thống, vui lòng khởi động lại');
});
