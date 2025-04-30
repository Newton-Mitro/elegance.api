import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserAggregateDto } from '../dto/user-aggregate.dto';
import { IUserRoleRepository } from '../../domain/repositories/user-role.repository';
import { UserAggregateMapper } from '../mappers/user-aggregate-dto.mapper';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(id: string): Promise<UserAggregateDto> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const roles = await this.userRoleRepository.getUserRoles(
      user.id.toString(),
    );

    const userAggregateDto = UserAggregateMapper.toDto(user, roles);

    return userAggregateDto;
  }
}
