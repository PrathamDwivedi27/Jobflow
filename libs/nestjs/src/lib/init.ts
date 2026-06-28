import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

export async function init(app: INestApplication, globalPrefix = 'api') {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  const port = app.get(ConfigService).getOrThrow('PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
