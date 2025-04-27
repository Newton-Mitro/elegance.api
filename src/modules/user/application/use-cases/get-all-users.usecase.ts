import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserDto } from '../dto/user.dto';

export interface GetAllUsersInput {
  page: number;
  limit: number;
  search?: string;
}

export interface GetAllUsersOutput {
  users: UserDto[];
  total: number;
}

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: GetAllUsersInput): Promise<GetAllUsersOutput> {
    const skip = (input.page - 1) * input.limit;
    const [users, total] = await this.userRepo.findAndCount({
      skip,
      take: input.limit,
      search: input.search,
    });

    return { users, total };
  }
}
