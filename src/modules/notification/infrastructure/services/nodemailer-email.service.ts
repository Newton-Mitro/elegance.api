import { ConfigService } from '@nestjs/config';

import nodemailer, { Transporter } from 'nodemailer';
import { EmailConfig } from '../../../../config/types/config.type';
import {
  NotificationService,
  SendNotificationOptions,
} from '../../domain/services/notification.service';

export class NodemailerEmailService implements NotificationService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<EmailConfig>('email');

    this.transporter = nodemailer.createTransport({
      host: emailConfig?.host,
      port: emailConfig?.port || 587,
      auth: {
        user: emailConfig?.username,
        pass: emailConfig?.password,
      },
    });
  }

  async send({
    to,
    subject,
    body,
    attachments,
  }: SendNotificationOptions): Promise<void> {
    await this.transporter.sendMail({
      from: '"App Team" <noreply@app.com>',
      to,
      subject,
      html: body,
      attachments: attachments?.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType,
      })),
    });
  }
}
