import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  INotificationService,
  ISendNotificationOptions,
} from '../../domain/services/notification.service';
import { WhatsappConfig } from '../../../../config/types/config.type';
import fs from 'fs';
import path from 'path';

@Injectable()
export class WhatsAppService implements INotificationService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly apiUrl: string;
  private readonly accessToken: string;
  private readonly phoneNumberId: string;

  constructor(private readonly configService: ConfigService) {
    const whatsAppConfig = this.configService.get<WhatsappConfig>('whatsapp')!;
    this.accessToken = whatsAppConfig.accessToken;
    this.phoneNumberId = whatsAppConfig.phoneNumberId;

    this.apiUrl = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;
  }

  async send({ to, subject, body }: ISendNotificationOptions): Promise<void> {
    const fullMessage = subject ? `${subject}: ${body}` : body;

    // Log to file if accessToken is 'log'
    if (this.accessToken === 'log') {
      const logDir = path.resolve(process.cwd(), 'whatsapp');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${to.replace(/\D/g, '')}.txt`;
      const filePath = path.join(logDir, fileName);

      const content = [
        `To: ${to}`,
        `------------------`,
        `Body:\n\n${fullMessage}`,
        `------------------`,
      ].join('\n\n');

      fs.writeFileSync(filePath, content.trim());
      this.logger.log(`📄 WhatsApp message logged to ${filePath}`);
      return;
    }

    try {
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

      this.logger.log(`📱 WhatsApp message sent to ${to}`);
    } catch (error) {
      this.logger.error(
        '❌ Failed to send WhatsApp message',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error?.response?.data || error,
      );
      throw new Error('WhatsApp message sending failed');
    }
  }
}
