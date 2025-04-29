import { Paginate } from '../../../../core/types/paginate.type';
import { SortOrder } from '../../../../core/types/sort_order.type';
import { UserEntity, UserProps } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export interface UserPaginationParams {
  page: number;
  limit: number;
  filter?: UserFilter;
  sortBy?: keyof UserProps;
  sortOrder?: SortOrder;
}

export interface UserFilter {
  name?: string;
  email?: string;
}

export interface IUserRepository {
  findPaginated(params: UserPaginationParams): Promise<Paginate<UserEntity>>;
  findById(id: string): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  save(user: UserEntity, tx?: Prisma.TransactionClient): Promise<void>;
  delete(id: string, tx?: Prisma.TransactionClient): Promise<void>;
}
