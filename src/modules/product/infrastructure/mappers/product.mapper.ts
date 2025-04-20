import { Prisma, Product as PrismaProduct } from '@prisma/client';
import { ProductEntity } from '../../domain/entities/product.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export class ProductMapper {
  static toDomain(raw: PrismaProduct): ProductEntity {
    return ProductEntity.create(
      {
        name: raw.name,
        description: raw.description || undefined,
        price: Number(raw.price),
        stock: raw.stock,
        categoryId: raw.categoryId,
        vatRate: Number(raw.vatRate),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(entity: ProductEntity): PrismaProduct {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description ?? null,
      price: new Prisma.Decimal(entity.price),
      stock: entity.stock,
      categoryId: entity.categoryId,
      vatRate: new Prisma.Decimal(entity.vatRate),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
