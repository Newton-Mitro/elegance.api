import { RoleEntity } from '../entities/role.entity';

export interface IRoleRepository {
  findById(id: string): Promise<RoleEntity | null>;
  findByName(name: string): Promise<RoleEntity | null>;
  findAll(): Promise<RoleEntity[]>;
  create(role: RoleEntity): Promise<RoleEntity>;
  update(role: RoleEntity): Promise<RoleEntity>;
  delete(id: string): Promise<void>;
}
