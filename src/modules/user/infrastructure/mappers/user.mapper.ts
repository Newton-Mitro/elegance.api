import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { RoleEntity } from '../../domain/entities/role.entity';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserMapper {
  static toEntity(raw: any): UserEntity {
    const roles = raw.roles.map((role: any) =>
      RoleEntity.create(
        { name: role.name, description: role.description },
        new UniqueEntityID(role.id),
      ),
    );

    const userProps = {
      name: raw.name,
      phone: raw.phone,
      email: raw.email ? Email.create(raw.email) : undefined,
      profilePictureUrl: raw.profilePictureUrl,
      password: raw.password,
      status: UserStatus[raw.status], // or directly: raw.status as UserStatus
      roles: roles,
      createdAt: raw.createdAt,
    };

    return UserEntity.create(userProps, new UniqueEntityID(raw.id));
  }

  static toDatabase(user: UserEntity): any {
    return {
      id: user.id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email ? user.email.value : null, // Assuming Email has a `value` property
      profilePictureUrl: user.profilePictureUrl,
      password: user.password,
      status: user.status,
      roles: user.roles.map((role) => ({
        id: role.id.toString(),
        name: role.name,
        description: role.description,
      })),
      createdAt: user.createdAt,
    };
  }
}
