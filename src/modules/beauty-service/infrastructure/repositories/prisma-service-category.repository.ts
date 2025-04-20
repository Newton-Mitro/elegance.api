import { PrismaClient, Prisma } from '@prisma/client';
import { IServiceCategoryRepository } from '../../domain/repositories/service-category.repository';
import { ServiceCategoryEntity } from '../../domain/entities/service-category.entity';
import { ServiceCategoryMapper } from '../mappers/service-category.mapper';

export class PrismaServiceCategoryRepository
  implements IServiceCategoryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  private getClient(tx?: Prisma.TransactionClient) {
    return tx ?? this.prisma;
  }

  async findById(id: string): Promise<ServiceCategoryEntity | null> {
    const data = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });
    return data ? ServiceCategoryMapper.toDomain(data) : null;
  }

  async findByName(name: string): Promise<ServiceCategoryEntity | null> {
    const data = await this.prisma.serviceCategory.findUnique({
      where: { name },
    });
    return data ? ServiceCategoryMapper.toDomain(data) : null;
  }

  async findAll(): Promise<ServiceCategoryEntity[]> {
    const categories = await this.prisma.serviceCategory.findMany();
    return categories.map((category) =>
      ServiceCategoryMapper.toDomain(category),
    );
  }

  async create(
    category: ServiceCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this.getClient(tx);
    await client.serviceCategory.create({
      data: {
        id: category.id.toString(),
        name: category.name,
        nameBn: category.nameBn,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });
  }

  async update(
    category: ServiceCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this.getClient(tx);
    await client.serviceCategory.update({
      where: { id: category.id.toString() },
      data: {
        name: category.name,
        nameBn: category.nameBn,
        updatedAt: category.updatedAt,
      },
    });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = this.getClient(tx);
    await client.serviceCategory.delete({ where: { id } });
  }
}
