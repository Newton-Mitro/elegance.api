import { AccountEntity } from '../../domain/entities/account.entity';
import { IAccountRepository } from '../../domain/repositories/account.repository';
import { AccountMapper } from '../mappers/account.mapper';
import { PrismaClient } from '@prisma/client';

export class PrismaAccountRepository implements IAccountRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<AccountEntity | null> {
    const record = await this.prisma.account.findUnique({ where: { id } });
    return record ? AccountMapper.toDomain(record) : null;
  }

  async findByCode(code: string): Promise<AccountEntity | null> {
    const record = await this.prisma.account.findUnique({ where: { code } });
    return record ? AccountMapper.toDomain(record) : null;
  }

  async create(account: AccountEntity, tx = this.prisma): Promise<void> {
    const data = AccountMapper.toPersistence(account);
    await tx.account.create({ data });
  }

  async update(account: AccountEntity, tx = this.prisma): Promise<void> {
    const data = AccountMapper.toPersistence(account);
    await tx.account.update({
      where: { id: account.id.toString() },
      data,
    });
  }

  async delete(id: string, tx = this.prisma): Promise<void> {
    await tx.account.delete({ where: { id } });
  }
}
