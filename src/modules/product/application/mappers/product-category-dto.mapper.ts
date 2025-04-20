import { ProductCategoryEntity } from '../../domain/entities/product-category.entity';
import {
  CreateProductCategoryDto,
  ProductCategoryResponseDto,
  UpdateProductCategoryDto,
} from '../dto/product-category.dto';

export class ProductCategoryDtoMapper {
  static toEntity(dto: CreateProductCategoryDto): ProductCategoryEntity {
    return ProductCategoryEntity.create({
      name: dto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toUpdatedEntity(
    entity: ProductCategoryEntity,
    dto: UpdateProductCategoryDto,
  ): ProductCategoryEntity {
    if (dto.name) entity.updateName(dto.name);
    entity.setUpdatedAt(new Date());
    return entity;
  }

  static toResponseDto(
    entity: ProductCategoryEntity,
  ): ProductCategoryResponseDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
