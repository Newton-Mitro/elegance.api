import { Prisma, Service as PrismaModel } from '@prisma/client';
import { ServiceEntity } from '../../domain/entities/service.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class ServiceMapper {
  static toDomain(raw: PrismaModel): ServiceEntity {
    return ServiceEntity.create(
      {
        name: raw.name,
        nameBn: raw.nameBn ?? undefined,
        description: raw.description ?? undefined,
        categoryId: raw.categoryId,
        price: raw.price.toNumber(),
        durationMin: raw.durationMin,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(entity: ServiceEntity): PrismaModel {
    return {
      id: entity.id.toString(),
      name: entity.name,
      nameBn: entity.nameBn ?? null,
      description: entity.description ?? null,
      categoryId: entity.categoryId,
      price: new Prisma.Decimal(entity.price),
      durationMin: entity.durationMin,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
