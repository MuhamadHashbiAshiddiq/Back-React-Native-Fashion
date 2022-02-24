import { User } from './models/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }

  @Post()
  async create(@Body() body): Promise<User> {
    const password = await bcrypt.hash('1234', 12);
    return await this.userService.create({
      email: body.email,
      password,
    });
  }
}
