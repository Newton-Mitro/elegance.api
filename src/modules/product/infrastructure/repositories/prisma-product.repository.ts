import { ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaClient, Prisma } from '@prisma/client';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

export class PrismaProductRepository extends ProductRepository {
  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  async create(
    product: ProductEntity,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.product.create({
      data: ProductMapper.toPersistence(product),
    });
  }

  async update(
    product: ProductEntity,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.product.update({
      where: { id: product.id.toString() },
      data: ProductMapper.toPersistence(product),
    });
  }

  async delete(
    id: string,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await tx.product.delete({ where: { id } });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { id } });
    return raw ? ProductMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { name } });
    return raw ? ProductMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<ProductEntity[]> {
    const all = await this.prisma.product.findMany();
    return all.map((product) => ProductMapper.toDomain(product));
  }
}
