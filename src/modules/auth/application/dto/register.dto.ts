import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email/Phone is required' })
  identifier: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
