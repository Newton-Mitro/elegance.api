import { IsString } from 'class-validator';

export class SendVerificationLinkDto {
  @IsString()
  identifier: string; // can be email or phone
}
