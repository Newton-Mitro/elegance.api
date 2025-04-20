import { Prisma } from '@prisma/client';
import { ServiceCategoryEntity } from '../entities/service-category.entity';

export interface IServiceCategoryRepository {
  findById(id: string): Promise<ServiceCategoryEntity | null>;
  findByName(name: string): Promise<ServiceCategoryEntity | null>;
  findAll(): Promise<ServiceCategoryEntity[]>;

  create(
    category: ServiceCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  update(
    category: ServiceCategoryEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;
}
