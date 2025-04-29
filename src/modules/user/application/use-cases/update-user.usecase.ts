import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Email } from '../../domain/value-objects/email.vo';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new Error('User not found');
    }

    existing.updateUser({
      name: dto.name,
      email: dto.email ? Email.create(dto.email) : undefined,
      phone: dto.phone,
    });

    await this.userRepo.save(existing);
    return existing;
  }
}
