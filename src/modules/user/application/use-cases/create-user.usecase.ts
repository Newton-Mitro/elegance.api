import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Email } from '../../domain/value-objects/email.vo';
import { UserStatus } from '@prisma/client';
import { UserAggregateDto } from '../dto/user-aggregate.dto';
import { IUserRoleRepository } from '../../domain/repositories/user-role.repository';
import { UserAggregateMapper } from '../mappers/user-aggregate-dto.mapper';
import { UserAlreadyRegisteredException } from '../../../../core/exceptions/user-already-registered.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserAggregateDto> {
    // You might want to hash the password here
    const exists = await this.userRepo.findByEmail(dto.email);
    if (exists) {
      throw new UserAlreadyRegisteredException();
    }

    const user = UserEntity.create({
      name: dto.name,
      email: Email.create(dto.email),
      password: dto.password,
      status: UserStatus.INACTIVE,
    });
    await this.userRepo.save(user);

    const roles = await this.userRoleRepository.getUserRoles(
      user.id.toString(),
    );

    const userAggregateDto = UserAggregateMapper.toDto(user, roles);

    return userAggregateDto;
  }
}
