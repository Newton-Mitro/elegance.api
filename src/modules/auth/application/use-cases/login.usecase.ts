import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { isEmail } from 'class-validator';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserMapper } from '../../../user/application/mappers/user-dto.mapper';
import { IUserRoleRepository } from '../../../user/domain/repositories/user-role.repository';
import { RoleDtoMapper } from '../../../user/application/mappers/role.mapper';
import { EmailNotVerifiedException } from '../../../../core/exceptions/email-not-verified.exception';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly passwordHasherService: PasswordHasherService,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = isEmail(dto.identifier)
      ? await this.userRepository.findByEmail(dto.identifier)
      : await this.userRepository.findByPhone(dto.identifier);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive()) {
      throw new EmailNotVerifiedException();
    }

    const passwordValid = await this.passwordHasherService.compare(
      dto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = await this.userRoleRepository.getUserRoles(
      user.id.toString(),
    );

    const userDto = UserMapper.toDto(user);
    const rolesDtos = RoleDtoMapper.toDtos(roles);
    const userAggregateDto = { ...userDto, roles: rolesDtos };

    const accessToken =
      await this.jwtAccessTokenStrategy.sign(userAggregateDto);
    const refreshToken =
      await this.jwtRefreshTokenStrategy.sign(userAggregateDto);

    return { accessToken, refreshToken, user: userAggregateDto };
  }
}
