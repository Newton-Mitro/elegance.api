import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { NotificationService } from '../../../notification/domain/services/notification.service';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService, // abstracted email sender
    private readonly tokenService: TokenService, // for creating/validating tokens
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<any> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, instructions will be sent.' };
    }

    const token = this.tokenService.createResetToken(user.id); // could be JWT or random string
    await this.notificationService.sendResetPasswordEmail(user.email, token);

    return { message: 'Password reset instructions sent to your email' };
  }
}
