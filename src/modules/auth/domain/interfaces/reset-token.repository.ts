import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';

export abstract class IResetTokenRepository {
  abstract findByPhone(phone: string): Promise<ResetTokenEntity | null>;
  abstract findByToken(token: string): Promise<ResetTokenEntity | null>;
  abstract save(entity: ResetTokenEntity): Promise<void>;
  abstract deleteByPhone(phone: string): Promise<void>;
}
