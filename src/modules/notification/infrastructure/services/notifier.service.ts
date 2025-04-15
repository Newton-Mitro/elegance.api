import { NotificationType } from '../../application/types/notification-type.enum';
import { SendNotificationOptions } from '../../domain/services/notification.service';
import { NodemailerEmailService } from './nodemailer-email.service';
import { SmsService } from './sms.service';
import { WhatsAppService } from './whatsapp.service';

export class NotifierService {
  private emailService: NodemailerEmailService;
  private smsService: SmsService;
  private whatsAppService: WhatsAppService;

  constructor(
    emailService: NodemailerEmailService,
    smsService: SmsService,
    whatsAppService: WhatsAppService,
  ) {
    this.emailService = emailService;
    this.smsService = smsService;
    this.whatsAppService = whatsAppService;
  }

  async sendNotification(
    options: SendNotificationOptions & { type: NotificationType },
  ): Promise<void> {
    const { type, to, subject, body, attachments } = options;
    switch (type) {
      case NotificationType.EMAIL:
        await this.emailService.send({ to, subject, body, attachments });
        break;
      case NotificationType.SMS:
        await this.smsService.send({ to, subject, body });
        break;
      case NotificationType.WHATSAPP:
        await this.whatsAppService.send({ to, subject, body });
        break;
      default:
        throw new Error(`Unknown notification type: ${type as string}`);
    }
  }
}
