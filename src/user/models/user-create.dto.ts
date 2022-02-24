import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @IsOptional()
  @IsString()
  username: string = `random-${Math.random()}`;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
