import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.productService.paginate(page);
  }

  @Post()
  async create(@Body() body: ProductCreateDto) {
    return await this.productService.create(body);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);

    return await this.productService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
