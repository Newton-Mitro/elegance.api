import { UserRoleEntity } from '../entities/user-role.entity';
import { RoleEntity } from '../entities/role.entity';
import { Prisma } from '@prisma/client';

export interface IUserRoleRepository {
  assignRoleToUser(
    userRole: UserRoleEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  revokeRoleFromUser(
    userRole: UserRoleEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  getUserRoles(userId: string): Promise<RoleEntity[]>;
  hasRole(userId: string, roleId: string): Promise<boolean>;
}
