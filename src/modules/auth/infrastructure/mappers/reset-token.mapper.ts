import { ResetToken } from '@prisma/client';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class ResetTokenMapper {
  static toDomain(prismaModel: ResetToken): ResetTokenEntity {
    return ResetTokenEntity.create(
      {
        phone: prismaModel.phone,
        token: prismaModel.token,
        createdAt: prismaModel.createdAt,
        updatedAt: prismaModel.updatedAt,
      },
      new UniqueEntityID(prismaModel.id),
    );
  }

  static toPersistence(entity: ResetTokenEntity): ResetToken {
    return {
      id: entity.id.toString(),
      phone: entity.phone,
      token: entity.token,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
