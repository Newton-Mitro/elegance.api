import { ProductCategory as PrismaProductCategory } from '@prisma/client';
import { ProductCategoryEntity } from '../../domain/entities/product-category.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class ProductCategoryMapper {
  static toDomain(raw: PrismaProductCategory): ProductCategoryEntity {
    return ProductCategoryEntity.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(entity: ProductCategoryEntity): PrismaProductCategory {
    return {
      id: entity.id.toString(),
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
