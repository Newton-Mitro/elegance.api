import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductDto } from '../dto/product.dto';

export class ProductMapper {
  static toDTO(entity: ProductEntity): ProductDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
      categoryId: entity.categoryId,
      vatRate: entity.vatRate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
