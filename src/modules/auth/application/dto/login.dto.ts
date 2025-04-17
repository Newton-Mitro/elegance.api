import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  identifier: string; // can be email or phone

  @MinLength(6)
  password: string;
}
