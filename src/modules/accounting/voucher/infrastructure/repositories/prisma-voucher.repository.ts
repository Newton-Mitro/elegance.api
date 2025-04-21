import { PrismaClient } from '@prisma/client';
import { VoucherRepository } from '../../domain/repositories/voucher.repository';
import { VoucherEntity } from '../../domain/entities/voucher.entity';
import { VoucherMapper } from '../mappers/voucher.mapper';

export class PrismaVoucherRepository implements VoucherRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(voucher: VoucherEntity): Promise<void> {
    const data = VoucherMapper.toPersistence(voucher);
    await this.prisma.$transaction(async (tx) => {
      await tx.voucher.create({
        data: {
          ...data,
          entries: {
            create: data.entries.map((entry) => ({
              ...entry,
            })),
          },
        },
      });
    });
  }

  async update(voucher: VoucherEntity): Promise<void> {
    const data = VoucherMapper.toPersistence(voucher);
    await this.prisma.$transaction(async (tx) => {
      await tx.journalEntry.deleteMany({
        where: { voucherId: data.id },
      });

      await tx.voucher.update({
        where: { id: data.id },
        data: {
          ...data,
          entries: {
            create: data.entries.map((entry) => ({
              ...entry,
            })),
          },
        },
      });
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.journalEntry.deleteMany({ where: { voucherId: id } });
      await tx.voucher.delete({ where: { id } });
    });
  }

  async findById(id: string): Promise<VoucherEntity | null> {
    const data = await this.prisma.voucher.findUnique({
      where: { id },
      include: { entries: true },
    });

    if (!data) return null;
    return VoucherMapper.toDomain(data);
  }
}
