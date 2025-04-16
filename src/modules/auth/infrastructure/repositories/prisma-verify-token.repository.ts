import { Injectable } from '@nestjs/common';
import { VerifyTokenMapper } from '../mappers/verify-token.mapper';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';

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

  async findByUserId(userId: string): Promise<VerifyTokenEntity | null> {
    const record = await this.prisma.verifyToken.findUnique({
      where: { userId },
    });
    return record ? VerifyTokenMapper.toDomain(record) : null;
  }

  async save(entity: VerifyTokenEntity): Promise<void> {
    const data = VerifyTokenMapper.toPersistence(entity);

    await this.prisma.verifyToken.upsert({
      where: { userId: data.userId },
      update: data,
      create: data,
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.verifyToken.delete({ where: { userId } });
  }
}
