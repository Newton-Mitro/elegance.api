import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Prisma } from '@prisma/client';

export interface IRefreshTokenRepository {
  findByToken(token: string): Promise<RefreshTokenEntity | null>;
  findByUserId(userId: UniqueEntityID): Promise<RefreshTokenEntity | null>;
  save(
    entity: RefreshTokenEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  deleteByUserId(
    userId: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
}
