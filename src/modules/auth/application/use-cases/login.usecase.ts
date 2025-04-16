import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { AuthUser } from '../../domain/entities/auth.user';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(dto: LoginDto): Promise<any> {
    const user = await this.userRepository.findByPhone(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await this.passwordHasherService.compare(
      dto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: AuthUser = {
      id: user.id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email?.value,
      profilePictureUrl: user.profilePictureUrl,
    };

    const accessToken = await this.jwtAccessTokenStrategy.sign(payload);
    const refreshToken = await this.jwtRefreshTokenStrategy.sign(payload);

    return { accessToken, refreshToken, user };
  }
}
