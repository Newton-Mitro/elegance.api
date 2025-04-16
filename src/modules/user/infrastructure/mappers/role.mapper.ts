import { Role } from '@prisma/client';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { RoleEntity } from '../../domain/entities/role.entity';

export class RoleEntityMapper {
  static toDomain(raw: Role): RoleEntity {
    return RoleEntity.create(
      {
        name: raw.name,
        description: raw.description ?? undefined,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(role: RoleEntity): Role {
    return {
      id: role.id.toString(),
      name: role.name,
      description: role.description ?? null,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
