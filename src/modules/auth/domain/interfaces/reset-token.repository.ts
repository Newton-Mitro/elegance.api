import { ResetTokenEntity } from '../entities/reset-token.entity';
import { Prisma } from '@prisma/client';

export interface IResetTokenRepository {
  findByToken(token: string): Promise<ResetTokenEntity | null>;
  findByPhone(phone: string): Promise<ResetTokenEntity | null>;
  save(entity: ResetTokenEntity, tx?: Prisma.TransactionClient): Promise<void>;
  deleteByPhone(phone: string, tx?: Prisma.TransactionClient): Promise<void>;
}
