import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { EmailConfig } from '../../../../config/types/config.type';
import {
  NotificationService,
  SendNotificationOptions,
} from '../../domain/services/notification.service';
import fs from 'fs';
import path from 'path';

export class NodemailerEmailService implements NotificationService {
  private transporter: Transporter;
  private logEmailsToFile = false;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<EmailConfig>('email');

    if (emailConfig?.host === 'log') {
      this.logEmailsToFile = true;

      // Dummy transporter for consistency; won't actually be used
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: emailConfig?.host,
        port: emailConfig?.port || 587,
        auth: {
          user: emailConfig?.username,
          pass: emailConfig?.password,
        },
      });
    }
  }

  async send({
    to,
    subject,
    body,
    attachments,
  }: SendNotificationOptions): Promise<void> {
    const message = {
      from: '"App Team" <noreply@app.com>',
      to,
      subject,
      html: body,
      attachments: attachments?.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType,
      })),
    };

    if (this.logEmailsToFile) {
      const outputDir = path.resolve(__dirname, '../../../../../logs/emails');
      fs.mkdirSync(outputDir, { recursive: true });

      const filename = `email-${Date.now()}.txt`;
      const filePath = path.join(outputDir, filename);

      const logContent = [
        `To: ${to}`,
        `Subject: ${subject}`,
        `Date: ${new Date().toISOString()}`,
        `------------------`,
        `HTML Body:\n\n${body}`,
        `------------------`,
        `Attachments: ${
          attachments?.length
            ? attachments.map((a) => a.filename).join(', ')
            : 'None'
        }`,
      ].join('\n\n');

      fs.writeFileSync(filePath, logContent);
      console.log(`📩 Email logged to: ${filePath}`);
      return;
    }

    await this.transporter.sendMail(message);
  }
}
