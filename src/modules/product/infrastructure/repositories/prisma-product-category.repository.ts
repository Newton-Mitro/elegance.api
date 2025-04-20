import { PrismaClient, Prisma } from '@prisma/client';
import { ProductCategoryRepository } from '../../domain/repositories/product-category.repository';
import { ProductCategoryEntity } from '../../domain/entities/product-category.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class PrismaProductCategoryRepository extends ProductCategoryRepository {
  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  async create(
    entity: ProductCategoryEntity,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.productCategory.create({
      data: {
        id: entity.id.toString(),
        name: entity.name,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  async update(
    entity: ProductCategoryEntity,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.productCategory.update({
      where: { id: entity.id.toString() },
      data: {
        name: entity.name,
        updatedAt: entity.updatedAt,
      },
    });
  }

  async delete(
    id: string,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.productCategory.delete({ where: { id } });
  }

  async findById(id: string): Promise<ProductCategoryEntity | null> {
    const record = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!record) return null;

    return ProductCategoryEntity.create(
      {
        name: record.name,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
      new UniqueEntityID(record.id),
    );
  }

  async findByName(name: string): Promise<ProductCategoryEntity | null> {
    const record = await this.prisma.productCategory.findUnique({
      where: { name },
    });
    if (!record) return null;

    return ProductCategoryEntity.create(
      {
        name: record.name,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
      new UniqueEntityID(record.id),
    );
  }

  async findAll(): Promise<ProductCategoryEntity[]> {
    const records = await this.prisma.productCategory.findMany();

    return records.map((record) =>
      ProductCategoryEntity.create(
        {
          name: record.name,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        },
        new UniqueEntityID(record.id),
      ),
    );
  }
}
