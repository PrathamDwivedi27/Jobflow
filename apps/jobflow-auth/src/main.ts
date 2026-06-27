// eslint-disable-next-line @nx/enforce-module-boundaries
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { GrpcOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  const port = app.get(ConfigService).getOrThrow('AUTH_PORT');
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

/*

This does three things at once:

1.Starts a normal HTTP server (for GraphQL mutations like login)
2.Starts a gRPC microservice on the same process (so jobflow-jobs can call it internally)
3.whitelist: true on ValidationPipe strips any extra fields not in your DTOs — protects against unexpected input
4.cookieParser() lets Express read req.cookies — without this, request.cookies.Authentication would be undefined

Why gRPC here? Because jobflow-jobs needs to verify a user's identity. Instead of calling the public HTTP/GraphQL API, 
services talk through gRPC — faster, type-safe via protobuf, and not exposed publicly.

*/
