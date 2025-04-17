import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { TemplateEngine } from '../../../../core/email/template.engine';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';
import { NotifierService } from '../../../notification/infrastructure/services/notifier.service';
import { NotificationType } from '../../../notification/application/types/notification-type.enum';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly notifierService: NotifierService, // abstracted email sender
    @Inject('IResetTokenRepository')
    private readonly resetTokenRepository: IResetTokenRepository, // for creating/validating tokens
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<any> {
    const user = await this.userRepository.findByPhone(dto.email);
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
      await this.notifierService.sendNotification({
        to: user.email.value,
        subject: 'Forgot Password Token',
        body: html,
        type: NotificationType.EMAIL,
      });
    }

    return { message: 'Password reset instructions sent to your email' };
  }
}
