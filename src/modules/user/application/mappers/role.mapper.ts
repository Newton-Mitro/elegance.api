// application/mappers/role.mapper.ts
import { RoleEntity } from '../../domain/entities/role.entity';
import { RoleDto } from '../dto/user/user-aggregate.dto';

export class RoleDtoMapper {
  static toDto(role: RoleEntity): RoleDto {
    return {
      id: role.id.toString(),
      name: role.name,
      description: role.description,
    };
  }

  static toDtos(roles: RoleEntity[]): RoleDto[] {
    return roles.map((role) => this.toDto(role));
  }
}
