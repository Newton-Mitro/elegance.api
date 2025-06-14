import { Injectable } from '@nestjs/common';
import { ResetTokenMapper } from '../mappers/reset-token.mapper';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaResetTokenRepository implements IResetTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByToken(token: string): Promise<ResetTokenEntity | null> {
    const resetToken = await this.prisma.resetToken.findUnique({
      where: { token },
    });
    return resetToken ? ResetTokenMapper.toDomain(resetToken) : null;
  }

  async findByPhone(identifier: string): Promise<ResetTokenEntity | null> {
    const token = await this.prisma.resetToken.findUnique({
      where: { identifier },
    });
    return token ? ResetTokenMapper.toDomain(token) : null;
  }

  async save(
    entity: ResetTokenEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.resetToken.upsert({
      where: { identifier: entity.identifier },
      update: ResetTokenMapper.toPersistence(entity),
      create: ResetTokenMapper.toPersistence(entity),
    });
  }

  async deleteByPhone(
    identifier: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.resetToken.deleteMany({ where: { identifier } });
  }
}
