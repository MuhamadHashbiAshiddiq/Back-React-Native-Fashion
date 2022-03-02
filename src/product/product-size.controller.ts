import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductSize } from './models/product-size.entity';
import { ProductSizeService } from './product-size.service';

@Controller('sizes')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductSizes(): Promise<ProductSize[]> {
    return this.productSizeService.getProductSizes();
  }

  @Post()
  async createProductSizes(@Body('name') name: string): Promise<ProductSize> {
    return this.productSizeService.createProductSize({ name });
  }

  @Put(':id')
  async updateProductSizes(
    @Param('id') productSizeId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.productSizeService.updateProductSize(productSizeId, { name });
  }

  @Delete(':id')
  async deleteProductSizes(@Param('id') productSizeId): Promise<any> {
    return this.productSizeService.deleteProductSize(productSizeId);
  }
}
