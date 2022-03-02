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
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductSize]),
    CommonModule,
  ],
  controllers: [
    ProductController,
    ProductSizeController,
    UploadController,
    CategoryController,
  ],
  providers: [ProductService, ProductSizeService, CategoryService],
  exports: [ProductService],
})
export class ProductModule {}
