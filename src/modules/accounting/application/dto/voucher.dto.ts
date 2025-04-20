import { VoucherStatus } from '../../domain/enums/voucher-status.enum';
import { VoucherType } from '../../domain/enums/voucher-type.enum';
import { JournalEntryDto } from './journal-entry.dto';

export interface VoucherDto {
  id: string;
  type: VoucherType;
  status: VoucherStatus;
  date: Date;
  reference?: string;
  narration?: string;
  createdAt: Date;
  updatedAt: Date;
  entries: JournalEntryDto[];
}
