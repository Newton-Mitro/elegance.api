import { ServiceCategoryEntity } from '../../domain/entities/service-category.entity';
import { ServiceCategoryResponseDto } from '../dto/service-category.dto';

export class ServiceCategoryDtoMapper {
  static toResponseDto(
    entity: ServiceCategoryEntity,
  ): ServiceCategoryResponseDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      nameBn: entity.nameBn,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
