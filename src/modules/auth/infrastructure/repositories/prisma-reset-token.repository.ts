import { Injectable } from '@nestjs/common';
import { ResetTokenMapper } from '../mappers/reset-token.mapper';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class PrismaResetTokenRepository implements IResetTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPhone(phone: string): Promise<ResetTokenEntity | null> {
    const token = await this.prisma.resetToken.findUnique({ where: { phone } });
    return token ? ResetTokenMapper.toDomain(token) : null;
  }

  async save(entity: ResetTokenEntity): Promise<void> {
    await this.prisma.resetToken.upsert({
      where: { phone: entity.phone },
      update: ResetTokenMapper.toPersistence(entity),
      create: ResetTokenMapper.toPersistence(entity),
    });
  }

  async deleteByPhone(phone: string): Promise<void> {
    await this.prisma.resetToken.deleteMany({ where: { phone } });
  }
}
