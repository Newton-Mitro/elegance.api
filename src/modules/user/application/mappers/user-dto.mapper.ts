import { UserEntity } from '../../domain/entities/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static toDto(user: UserEntity): UserDto {
    return {
      id: user.id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email?.value,
      profilePictureUrl: user.profilePictureUrl,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
