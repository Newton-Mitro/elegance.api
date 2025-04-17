import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { AuthUserDto } from '../dto/auth-user.dto';
import { isEmail } from 'class-validator';
import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthUserMapper } from '../mappers/auth-user.mapper';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = isEmail(dto.identifier)
      ? await this.userRepository.findByEmail(dto.identifier)
      : await this.userRepository.findByPhone(dto.identifier);

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

    const payload: AuthUserDto = {
      id: user.id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email?.value,
      profilePictureUrl: user.profilePictureUrl,
    };

    const accessToken = await this.jwtAccessTokenStrategy.sign(payload);
    const refreshToken = await this.jwtRefreshTokenStrategy.sign(payload);

    const userDto = AuthUserMapper.toAuthUserDto(user);

    return { accessToken, refreshToken, user: userDto };
  }
}
