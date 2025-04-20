import { Prisma } from '@prisma/client';
import { ProductCategoryEntity } from '../entities/product-category.entity';

export abstract class ProductCategoryRepository {
  abstract create(
    entity: ProductCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;

  abstract update(
    entity: ProductCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;

  abstract delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;

  abstract findById(id: string): Promise<ProductCategoryEntity | null>;

  abstract findByName(name: string): Promise<ProductCategoryEntity | null>;

  abstract findAll(): Promise<ProductCategoryEntity[]>;
}
