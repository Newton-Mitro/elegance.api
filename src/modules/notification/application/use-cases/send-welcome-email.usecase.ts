import { NotificationAttachment } from '../../domain/services/notification.service';
import { NotifierService } from '../../infrastructure/services/notifier.service';
import { NotificationType } from '../types/notification-type.enum';

// Sample usecase. Others module will use email service to send email
export class SendWelcomeEmailUseCase {
  constructor(private readonly notifierService: NotifierService) {}

  async execute(
    to: string,
    attachments?: NotificationAttachment[],
  ): Promise<void> {
    const subject = 'Welcome!';
    const body = '<h1>Thanks for joining us!</h1>';

    // Pass the named parameters as an object to the send method
    await this.notifierService.sendNotification({
      type: NotificationType.EMAIL,
      to: to,
      subject: subject,
      body: body,
      attachments: attachments,
    });
  }
}
