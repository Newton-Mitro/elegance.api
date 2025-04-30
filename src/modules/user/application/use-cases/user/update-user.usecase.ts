import { Inject, Injectable } from '@nestjs/common';
import { IUserRoleRepository } from '../../../domain/repositories/user-role.repository';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { Email } from '../../../domain/value-objects/email.vo';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { UserAggregateDto } from '../../dto/user/user-aggregate.dto';
import { UserAggregateMapper } from '../../mappers/user-aggregate-dto.mapper';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserAggregateDto> {
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
    const roles = await this.userRoleRepository.getUserRoles(
      existing.id.toString(),
    );

    const userAggregateDto = UserAggregateMapper.toDto(existing, roles);

    return userAggregateDto;
  }
}
