import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    PrismaModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AuthService, AuthResolver],
})
export class AppModule {}
