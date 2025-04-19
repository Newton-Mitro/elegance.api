import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export interface IUserRepository {
  findById(id: UniqueEntityID): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  save(user: UserEntity, tx?: Prisma.TransactionClient): Promise<void>;
  delete(id: UniqueEntityID, tx?: Prisma.TransactionClient): Promise<void>;
}
