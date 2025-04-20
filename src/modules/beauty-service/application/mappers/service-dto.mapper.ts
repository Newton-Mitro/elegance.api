import { ServiceEntity } from '../../domain/entities/service.entity';
import { ServiceResponseDto } from '../dto/service.dto';

export class ServiceDtoMapper {
  static toResponseDto(entity: ServiceEntity): ServiceResponseDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      nameBn: entity.nameBn,
      description: entity.description,
      categoryId: entity.categoryId,
      price: parseFloat(entity.price.toString()),
      durationMin: entity.durationMin,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
