import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { VerifyTokenEntity } from '../entities/verify-token.entity';

export abstract class IVerifyTokenRepository {
  abstract findByToken(token: string): Promise<VerifyTokenEntity | null>;
  abstract findByUserId(
    userId: UniqueEntityID,
  ): Promise<VerifyTokenEntity | null>;
  abstract save(entity: VerifyTokenEntity): Promise<void>;
  abstract deleteByUserId(userId: UniqueEntityID): Promise<void>;
}
