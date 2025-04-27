import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Email } from '../../domain/value-objects/email.vo';
import { UserStatus } from '@prisma/client';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    // You might want to hash the password here
    const exists = await this.userRepo.findByEmail(dto.email);
    if (exists) {
      throw new Error('Email is already registered');
    }

    const user = UserEntity.create({
      name: dto.name,
      email: Email.create(dto.email),
      password: dto.password,
      status: UserStatus.INACTIVE,
    });
    await this.userRepo.save(user);
    return user;
  }
}
