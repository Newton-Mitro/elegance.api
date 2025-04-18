import { RoleEntity } from '../entities/role.entity';
import { UserRoleEntity } from '../entities/user-role.entity';

export interface IUserRoleRepository {
  assignRoleToUser(userRole: UserRoleEntity): Promise<void>;
  revokeRoleFromUser(userRole: UserRoleEntity): Promise<void>;
  getUserRoles(userId: string): Promise<RoleEntity[]>;
  hasRole(userId: string, roleId: string): Promise<boolean>;
}
