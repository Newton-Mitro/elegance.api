import {
  EmailAttachment,
  EmailService,
} from '../../domain/services/email.service';

// Sample usecase. Others module will use email service to send email
export class SendWelcomeEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(to: string, attachments?: EmailAttachment[]): Promise<void> {
    const subject = 'Welcome!';
    const body = '<h1>Thanks for joining us!</h1>';

    // Pass the named parameters as an object to the send method
    await this.emailService.send({
      to,
      subject,
      body,
      attachments,
    });
  }
}
