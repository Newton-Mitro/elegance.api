import { Injectable } from '@nestjs/common';
import { UserDtoMapper } from '../mappers/user-dto.mapper';
import {
  IUserRepository,
  UserPaginationParams,
} from '../../domain/repositories/user.repository';
import { Paginate } from '../../../../core/types/paginate.type';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

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
