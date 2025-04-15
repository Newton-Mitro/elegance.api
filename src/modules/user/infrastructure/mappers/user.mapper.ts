import { User } from '@prisma/client';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';

export class UserEntityMapper {
  static toDomain(raw: User): UserEntity {
    return UserEntity.create(
      {
        name: raw.name ?? undefined,
        phone: raw.phone,
        email: raw.email ? Email.create(raw.email) : undefined,
        profilePictureUrl: raw.profilePictureUrl ?? undefined,
        password: raw.password,
        status: raw.status,

        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(user: UserEntity): User {
    return {
      id: user.id.toString(),
      name: user.name ?? null,
      phone: user.phone,
      email: user.email?.value ?? null,
      profilePictureUrl: user.profilePictureUrl ?? null,
      password: user.password,
      status: user.status,
      createdAt: user.createdAt,
      // updatedAt is not managed in domain, can be handled by Prisma middleware or database trigger
    } as User;
  }
}
