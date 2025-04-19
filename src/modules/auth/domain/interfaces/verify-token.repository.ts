import { VerifyTokenEntity } from '../entities/verify-token.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Prisma } from '@prisma/client';

export abstract class IVerifyTokenRepository {
  abstract findByToken(token: string): Promise<VerifyTokenEntity | null>;
  abstract findByUserId(
    userId: UniqueEntityID,
  ): Promise<VerifyTokenEntity | null>;
  abstract save(
    entity: VerifyTokenEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  abstract deleteByUserId(
    userId: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
}
