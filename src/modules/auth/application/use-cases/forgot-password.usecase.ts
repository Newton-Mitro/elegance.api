import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { NotificationService } from '../../../notification/domain/services/notification.service';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetTokenRepository } from '../../infrastructure/repositories/prisma-reset-token.repository';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { TemplateEngine } from '../../infrastructure/email/template.engine';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly IUserRepository: IUserRepository,
    private readonly notificationService: NotificationService, // abstracted email sender
    private readonly resetTokenRepository: ResetTokenRepository, // for creating/validating tokens
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<any> {
    const user = await this.IUserRepository.findByPhone(dto.email);
    if (!user) {
      // Don't reveal if phone number exists
      return {
        message: 'If the phone number exists, instructions will be sent.',
      };
    }

    const token = '';
    const resetToken = ResetTokenEntity.create({
      phone: user.phone,
      token: token,
    });

    await this.resetTokenRepository.save(resetToken);

    const html = TemplateEngine.render('reset-password', {
      user: user.name,
      resetLink: `https://yourapp.com/verify?token=${token}`,
    });

    if (user.email) {
      await this.notificationService.send({
        to: user.email.value,
        subject: 'Forgot Password Token',
        body: html,
      });
    }

    return { message: 'Password reset instructions sent to your email' };
  }
}
