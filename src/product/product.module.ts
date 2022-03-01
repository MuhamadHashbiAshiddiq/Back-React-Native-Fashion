import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Product } from './models/product.entity';
import { ProductSizeService } from './product-size.service';
import { ProductSizeController } from './product-size.controller';
import { ProductSize } from './models/product-size.entity';
import { Category } from './models/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductSize]),
    CommonModule,
  ],
  controllers: [ProductController, ProductSizeController, UploadController],
  providers: [ProductService, ProductSizeService],
  exports: [ProductService],
})
export class ProductModule {}
