import { Injectable } from '@nestjs/common';
import { VerifyTokenMapper } from '../mappers/verify-token.mapper';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaVerifyTokenRepository extends IVerifyTokenRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findByToken(token: string): Promise<VerifyTokenEntity | null> {
    const record = await this.prisma.verifyToken.findUnique({
      where: { token },
    });
    return record ? VerifyTokenMapper.toDomain(record) : null;
  }

  async findByUserId(
    userId: UniqueEntityID,
  ): Promise<VerifyTokenEntity | null> {
    const record = await this.prisma.verifyToken.findUnique({
      where: { userId: userId.toString() },
    });
    return record ? VerifyTokenMapper.toDomain(record) : null;
  }

  async save(
    entity: VerifyTokenEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    const data = VerifyTokenMapper.toPersistence(entity);
    await client.verifyToken.upsert({
      where: { userId: data.userId },
      update: data,
      create: data,
    });
  }

  async deleteByUserId(
    userId: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.verifyToken.delete({
      where: { userId: userId.toString() },
    });
  }
}
