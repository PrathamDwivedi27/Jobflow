import { LoggerModule } from '@jobflow/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProductsModule,
    CategoriesModule
  ],
})
export class AppModule {}
