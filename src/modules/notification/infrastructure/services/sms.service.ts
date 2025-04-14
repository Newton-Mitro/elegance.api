import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  NotificationService,
  SendNotificationOptions,
} from '../../domain/services/notification.service';
import { SmsConfig } from '../../../../config/types/config.type';

@Injectable()
export class SmsService implements NotificationService {
  private readonly logger = new Logger(SmsService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly senderId: string;

  constructor(private readonly configService: ConfigService) {
    const smsConfig = this.configService.get<SmsConfig>('sms')!;
    this.apiUrl = smsConfig?.apiUrl;
    this.apiKey = smsConfig?.apiKey;
    this.apiSecret = smsConfig?.apiSecret;
    this.senderId = smsConfig?.senderId;
  }

  async send({ to, body }: SendNotificationOptions): Promise<void> {
    try {
      const payload = {
        api_key: this.apiKey,
        api_secret: this.apiSecret,
        from: this.senderId,
        to,
        text: body,
      };

      await axios.post(this.apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`SMS sent to ${to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send SMS to ${to}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error?.response?.data || error.message,
      );
      throw new Error('SMS sending failed');
    }
  }
}
