import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
