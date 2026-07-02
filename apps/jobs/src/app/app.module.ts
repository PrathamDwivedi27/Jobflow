import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from '@jobflow/nestjs';
import { GqlLoggingPlugin } from '@jobflow/graphql';
import { UploadsModule } from './uploads/uploads.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UploadsModule,
    LoggerModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      plugins: [new GqlLoggingPlugin()],
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
