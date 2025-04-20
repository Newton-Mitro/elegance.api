import { ServiceCategory as PrismaModel } from '@prisma/client';
import { ServiceCategoryEntity } from '../../domain/entities/service-category.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class ServiceCategoryMapper {
  static toDomain(raw: PrismaModel): ServiceCategoryEntity {
    return ServiceCategoryEntity.create(
      {
        name: raw.name,
        nameBn: raw.nameBn ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(entity: ServiceCategoryEntity): PrismaModel {
    return {
      id: entity.id.toString(),
      name: entity.name,
      nameBn: entity.nameBn ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
