import { RefreshToken } from '@prisma/client';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class RefreshTokenMapper {
  static toDomain(prismaModel: RefreshToken): RefreshTokenEntity {
    return RefreshTokenEntity.create(
      {
        userId: prismaModel.userId,
        token: prismaModel.token,
        expiresAt: prismaModel.expiresAt,
        createdAt: prismaModel.createdAt,
        updatedAt: prismaModel.updatedAt,
      },
      new UniqueEntityID(prismaModel.id),
    );
  }

  static toPersistence(entity: RefreshTokenEntity): RefreshToken {
    return {
      id: entity.id.toString(),
      userId: entity.userId,
      token: entity.token,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
