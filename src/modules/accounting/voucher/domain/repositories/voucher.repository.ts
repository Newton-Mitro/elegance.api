import { VoucherEntity } from '../entities/voucher.entity';

export interface VoucherRepository {
  create(voucher: VoucherEntity): Promise<void>;
  update(voucher: VoucherEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<VoucherEntity | null>;
}
