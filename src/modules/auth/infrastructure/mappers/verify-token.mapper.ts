import { VerifyToken } from '@prisma/client';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';

export class VerifyTokenMapper {
  static toDomain(model: VerifyToken): VerifyTokenEntity {
    return VerifyTokenEntity.create(
      {
        userId: model.userId,
        token: model.token,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      new UniqueEntityID(model.id),
    );
  }

  static toPersistence(entity: VerifyTokenEntity): Omit<VerifyToken, 'user'> {
    return {
      id: entity.id.toString(),
      userId: entity.userId,
      token: entity.token,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
