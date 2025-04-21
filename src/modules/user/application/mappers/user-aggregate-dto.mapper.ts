import { RoleEntity } from '../../domain/entities/role.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserAggregateDto } from '../dto/user-aggregate.dto';
import { RoleDtoMapper } from './role.mapper';

export class UserAggregateMapper {
  static toDto(user: UserEntity, roles: RoleEntity[]): UserAggregateDto {
    return {
      id: user.id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email?.value,
      profilePictureUrl: user.profilePictureUrl,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: RoleDtoMapper.toDtos(roles),
    };
  }
}
