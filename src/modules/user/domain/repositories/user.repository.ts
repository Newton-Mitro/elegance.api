import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  findById(id: UniqueEntityID): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
  delete(id: UniqueEntityID): Promise<void>;
}
