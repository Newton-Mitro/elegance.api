import { IsString, IsNotEmpty } from 'class-validator';

export class SendVerificationLinkDto {
  @IsString()
  @IsNotEmpty()
  identifier: string; // can be email or phone
}
