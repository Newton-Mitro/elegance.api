import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';
import { TemplateEngine } from '../../../../core/email/template.engine';
import { NotificationType } from '../../../notification/application/types/notification-type.enum';
import { NotifierService } from '../../../notification/infrastructure/services/notifier.service';

@Injectable()
export class WelcomeEmailListener {
  constructor(private readonly notifierService: NotifierService) {}

  @OnEvent('user.registered')
  async handleUserRegistered(event: UserRegisteredEvent) {
    const html = TemplateEngine.render('welcome', {
      name: event.name,
      loginUrl: `https://yourapp.com/login`,
    });

    if (event.email) {
      await this.notifierService.sendNotification({
        to: event.email,
        subject: 'Welcome to Our Elegance Platform',
        body: html,
        type: NotificationType.EMAIL,
      });
    }
  }
}
