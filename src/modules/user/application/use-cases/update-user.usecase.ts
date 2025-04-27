import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const existing = await this.userRepo.findById(new UniqueEntityID(id));
    if (!existing) {
      throw new Error('User not found');
    }

    // Apply changes
    if (dto.name !== undefined) existing.name = dto.name;
    if (dto.password !== undefined) existing.password = dto.password; // hash as needed
    if (dto.role !== undefined) existing.role = dto.role;

    await this.userRepo.update(existing);
    return existing;
  }
}
