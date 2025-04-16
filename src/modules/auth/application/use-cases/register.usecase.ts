import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserStatus } from '@prisma/client';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { Email } from '../../../user/domain/value-objects/email.vo';
import { AuthUser } from '../../domain/entities/auth.user';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    private readonly hasher: PasswordHasherService,
  ) {}

  async execute(dto: RegisterDto) {
    const phoneExists = await this.userRepository.findByPhone(dto.phone);
    if (phoneExists) throw new Error('Phone already registered');

    const hashedPassword = await this.hasher.hash(dto.password);
    const newUser = UserEntity.create({
      name: dto.fullName,
      email: dto.email ? Email.create(dto.email) : undefined,
      phone: dto.phone,
      password: hashedPassword,
      status: UserStatus.INACTIVE,
    });

    await this.userRepository.save(newUser);

    // TODO: Send Welcome Email if email exist
    const payload: AuthUser = {
      id: newUser.id.toString(),
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email?.value,
      profilePictureUrl: newUser.profilePictureUrl,
    };

    const token = await this.jwtAccessTokenStrategy.sign(payload);

    return {
      accessToken: token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
