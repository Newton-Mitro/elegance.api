import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';

export abstract class IRefreshTokenRepository {
  abstract findByToken(token: string): Promise<RefreshTokenEntity | null>;
  abstract findByUserId(
    userId: UniqueEntityID,
  ): Promise<RefreshTokenEntity | null>;
  abstract save(entity: RefreshTokenEntity): Promise<void>;
  abstract deleteByUserId(userId: UniqueEntityID): Promise<void>;
}
