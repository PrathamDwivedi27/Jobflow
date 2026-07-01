import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './product.controller';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
