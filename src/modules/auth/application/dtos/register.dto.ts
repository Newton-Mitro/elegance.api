import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;

  @MinLength(10)
  phone: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
