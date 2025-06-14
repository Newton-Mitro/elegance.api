import { Injectable } from '@nestjs/common';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByToken(token: string): Promise<RefreshTokenEntity | null> {
    const record = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    return record ? RefreshTokenMapper.toDomain(record) : null;
  }

  async findByUserId(
    userId: UniqueEntityID,
  ): Promise<RefreshTokenEntity | null> {
    const record = await this.prisma.refreshToken.findUnique({
      where: { userId: userId.toString() },
    });
    return record ? RefreshTokenMapper.toDomain(record) : null;
  }

  async save(
    entity: RefreshTokenEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.refreshToken.upsert({
      where: { userId: entity.userId },
      update: RefreshTokenMapper.toPersistence(entity),
      create: RefreshTokenMapper.toPersistence(entity),
    });
  }

  async deleteByUserId(
    userId: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.refreshToken.deleteMany({
      where: { userId: userId.toString() },
    });
  }
}
