import { User } from './models/user.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true })) body: UserCreateDto,
  ): Promise<User> {
    const password = await bcrypt.hash('1234', 12);
    return await this.userService.create({
      username: body.username,
      email: body.email,
      password,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.userService.findOne({ id });
  }
}
