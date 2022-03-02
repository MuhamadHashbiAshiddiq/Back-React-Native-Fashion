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
import { CategoryService } from './category.service';
import { Category } from './models/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategory(): Promise<Category[]> {
    return this.categoryService.getCategory();
  }

  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return this.categoryService.createCategory({ name });
  }

  @Put(':id')
  async updateCategory(
    @Param('id') categoryId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.categoryService.updateCategory(categoryId, { name });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') categoryId): Promise<any> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
