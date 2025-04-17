import { Module } from '@nestjs/common';
import { NotifierService } from './infrastructure/services/notifier.service';
import { GrameenPhoneSmsService } from './infrastructure/services/grameenphone.sms.service';
import { NodemailerEmailService } from './infrastructure/services/nodemailer-email.service';
import { WhatsAppService } from './infrastructure/services/whatsapp.service';

@Module({
  exports: [
    NotifierService,
    NodemailerEmailService,
    GrameenPhoneSmsService,
    WhatsAppService,
  ],
  providers: [
    NotifierService,
    NodemailerEmailService,
    GrameenPhoneSmsService,
    WhatsAppService,
  ],
})
export class NotificationModule {}
