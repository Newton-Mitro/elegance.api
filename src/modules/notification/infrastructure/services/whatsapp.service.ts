// whatsapp.service.ts
import { NotificationService } from './notification.service.interface';
import twilio from 'twilio';

export class WhatsAppService implements NotificationService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.client.messages.create({
      body,
      from: 'whatsapp:+14155238886', // This is the Twilio WhatsApp sandbox number
      to: `whatsapp:${to}`, // To WhatsApp number
    });
  }
}
