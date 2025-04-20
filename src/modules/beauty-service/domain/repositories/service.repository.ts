import { Prisma } from '@prisma/client';
import { ServiceEntity } from '../entities/service.entity';

export interface IServiceRepository {
  create(service: ServiceEntity, tx?: Prisma.TransactionClient): Promise<void>;
  update(service: ServiceEntity, tx?: Prisma.TransactionClient): Promise<void>;
  delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;
  findById(id: string): Promise<ServiceEntity | null>;
}
