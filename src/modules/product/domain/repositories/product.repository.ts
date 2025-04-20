import { ProductEntity } from '../entities/product.entity';
import { Prisma } from '@prisma/client';

export abstract class ProductRepository {
  abstract create(
    product: ProductEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  abstract update(
    product: ProductEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  abstract delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;

  abstract findById(id: string): Promise<ProductEntity | null>;
  abstract findByName(name: string): Promise<ProductEntity | null>;
  abstract findAll(): Promise<ProductEntity[]>;
}
