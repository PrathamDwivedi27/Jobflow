import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProductsService],
})
export class ProductsModule {}
