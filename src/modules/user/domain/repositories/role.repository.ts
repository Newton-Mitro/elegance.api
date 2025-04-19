import { RoleEntity } from '../entities/role.entity';
import { Prisma } from '@prisma/client';

export interface IRoleRepository {
  findById(id: string): Promise<RoleEntity | null>;
  findByName(name: string): Promise<RoleEntity | null>;
  findAll(): Promise<RoleEntity[]>;
  create(role: RoleEntity, tx?: Prisma.TransactionClient): Promise<RoleEntity>;
  update(role: RoleEntity, tx?: Prisma.TransactionClient): Promise<RoleEntity>;
  delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;
}
