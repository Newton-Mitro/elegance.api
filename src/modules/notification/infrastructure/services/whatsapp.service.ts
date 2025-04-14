import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  NotificationService,
  SendNotificationOptions,
} from '../../domain/services/notification.service';
import { WhatsappConfig } from '../../../../config/types/config.type';

@Injectable()
export class WhatsAppService implements NotificationService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly apiUrl: string;
  private readonly accessToken: string;

  constructor(private readonly configService: ConfigService) {
    const whatsAppConfig = this.configService.get<WhatsappConfig>('whatsapp')!;
    this.accessToken = whatsAppConfig?.accessToken;

    this.apiUrl = `https://graph.facebook.com/v19.0/${whatsAppConfig?.phoneNumberId}/messages`;
  }

  async send({ to, subject, body }: SendNotificationOptions): Promise<void> {
    try {
      const fullMessage = subject ? `${subject}: ${body}` : body;

      await axios.post(
        this.apiUrl,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: fullMessage },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`WhatsApp message sent to ${to}`);
    } catch (error) {
      this.logger.error(
        'Failed to send WhatsApp message',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error?.response?.data || error,
      );
      throw new Error('WhatsApp message sending failed');
    }
  }
}
