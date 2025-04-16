import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserStatus } from '@prisma/client';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    private readonly hasher: PasswordHasherService,
  ) {}

  async execute(dto: RegisterDto) {
    const emailExists = await this.userRepo.findByPhone(dto.phone);
    if (emailExists) throw new Error('Phone already registered');

    const hashedPassword = await this.hasher.hash(dto.password);
    const newUser = UserEntity.create({
      phone: dto.phone,
      password: hashedPassword,
      status: UserStatus.INACTIVE,
    });

    await this.userRepo.save(newUser);

    const token = await this.jwtAccessTokenStrategy.sign(newUser);

    return {
      accessToken: token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
