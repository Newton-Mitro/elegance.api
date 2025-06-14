import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';
import { TemplateEngine } from '../../../../core/email/template.engine';
import { NotificationType } from '../../../notification/application/types/notification-type.enum';
import { NotifierService } from '../../../notification/infrastructure/services/notifier.service';
import { SendVerificationLinkEvent } from '../../domain/events/send-verification-link.event';

@Injectable()
export class SendVerificationLinkListener {
  constructor(private readonly notifierService: NotifierService) {}

  @OnEvent('user.registered')
  async handleUserRegistered(event: UserRegisteredEvent) {
    // Send welcome email
    console.log(`Sending welcome email to ${event.email}`);
    const html = TemplateEngine.render('verify-email', {
      name: event.name,
      link: `https://yourapp.com/email/verify?token=${event.token}`,
    });

    if (event.email) {
      await this.notifierService.sendNotification({
        to: event.email,
        subject: 'Verify Your Email Address',
        body: html,
        type: NotificationType.EMAIL,
      });
    }
  }

  @OnEvent('send-verify.email')
  async handleResendVerificationLink(event: SendVerificationLinkEvent) {
    // Send welcome email
    console.log(`Sending welcome email to ${event.email}`);
    const html = TemplateEngine.render('verify-email', {
      name: event.name,
      link: `https://yourapp.com/email/verify?token=${event.token}`,
    });

    if (event.email) {
      await this.notifierService.sendNotification({
        to: event.email,
        subject: 'Verify Your Email Address',
        body: html,
        type: NotificationType.EMAIL,
      });
    }
  }
}
