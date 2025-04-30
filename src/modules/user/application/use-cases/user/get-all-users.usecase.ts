import { Inject, Injectable } from '@nestjs/common';
import { Paginate } from '../../../../../core/types/paginate.type';
import {
  IUserRepository,
  UserPaginationParams,
} from '../../../domain/repositories/user.repository';
import { UserDto } from '../../dto/user/user.dto';
import { UserDtoMapper } from '../../mappers/user-dto.mapper';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: UserPaginationParams): Promise<Paginate<UserDto>> {
    const result = await this.userRepo.findPaginated({
      page: input.page,
      limit: input.limit,
      filter: input.filter,
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
    });

    const users = result.data.map((user) => UserDtoMapper.toDto(user));

    return {
      data: users,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    };
  }
}
