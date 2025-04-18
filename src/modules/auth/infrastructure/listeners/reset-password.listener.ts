import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { TemplateEngine } from '../../../../core/email/template.engine';
import { NotificationType } from '../../../notification/application/types/notification-type.enum';
import { NotifierService } from '../../../notification/infrastructure/services/notifier.service';
import { ForgotPasswordEvent } from '../../domain/events/forgot-password.event';

@Injectable()
export class ResetPasswordListener {
  constructor(private readonly notifierService: NotifierService) {}

  @OnEvent('forgot.password')
  async handleUserRegistered(event: ForgotPasswordEvent) {
    // Send welcome email
    console.log(`Sending welcome email to ${event.email}`);
    const html = TemplateEngine.render('reset-password', {
      name: event.name,
      link: `https://yourapp.com/reset-password/verify?token=${event.token}`,
    });

    if (event.email) {
      await this.notifierService.sendNotification({
        to: event.email,
        subject: 'Reset Your Password',
        body: html,
        type: NotificationType.EMAIL,
      });
    }
  }
}
