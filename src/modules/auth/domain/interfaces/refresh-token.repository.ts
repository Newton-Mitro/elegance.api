import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';

export abstract class IRefreshTokenRepository {
  abstract findByToken(token: string): Promise<RefreshTokenEntity | null>;
  abstract findByUserId(userId: string): Promise<RefreshTokenEntity | null>;
  abstract save(entity: RefreshTokenEntity): Promise<void>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
