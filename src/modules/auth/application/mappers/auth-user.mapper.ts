import { UserEntity } from '../../../user/domain/entities/user.entity';
import { AuthUserDto } from '../dto/auth-user.dto';

export class AuthUserMapper {
  static toAuthUserDto(user: UserEntity): AuthUserDto {
    return {
      id: user.id.toString(), // Assuming `id` is a UniqueEntityID
      name: user.name,
      email: user.email?.value, // Email is likely a Value Object
      phone: user.phone,
      profilePictureUrl: user.profilePictureUrl,
    };
  }
}
