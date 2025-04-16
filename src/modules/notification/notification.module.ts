import { Module } from '@nestjs/common';
import { NotifierService } from './infrastructure/services/notifier.service';

@Module({
  exports: [NotifierService],
  providers: [NotifierService],
})
export class NotificationModule {}
