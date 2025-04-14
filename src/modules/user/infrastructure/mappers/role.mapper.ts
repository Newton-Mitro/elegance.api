import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { RoleEntity } from '../../domain/entities/role.entity';

export class RoleMapper {
  static toDomain(raw: any): RoleEntity {
    return new RoleEntity(
      {
        name: raw.name,
        description: raw.description ?? undefined,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(role: RoleEntity): any {
    return {
      id: role.id.toString(),
      name: role.props.name,
      description: role.props.description ?? null,
    };
  }
}
