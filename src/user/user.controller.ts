import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDTO } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { User } from './models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.userService.paginate(page);
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

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDTO) {
    const id = await this.authService.userId(request);

    await this.userService.update(id, body);

    return await this.userService.findOne({ id });
  }

  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('passwordConfirm') passwordConfirm: string,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const id = await this.authService.userId(request);

    const hashed = await bcrypt.hash(password, 12);

    await this.userService.update(id, { password: hashed });

    return {
      message: 'Update password success',
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDTO) {
    await this.userService.update(id, body);

    return await this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
    return {
      message: 'Delete success',
    };
  }
}
