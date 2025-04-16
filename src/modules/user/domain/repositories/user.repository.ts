import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract findById(id: UniqueEntityID): Promise<UserEntity | null>;
  abstract findByPhone(phone: string): Promise<UserEntity | null>;
  abstract save(user: UserEntity): Promise<void>;
  abstract delete(id: UniqueEntityID): Promise<void>;
}
