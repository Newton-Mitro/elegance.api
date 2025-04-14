// sms.service.ts
import { NotificationService } from './notification.service.interface';
import twilio from 'twilio';

export class SmsService implements NotificationService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.client.messages.create({
      body,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to,
    });
  }
}
