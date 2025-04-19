import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserAccountDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
