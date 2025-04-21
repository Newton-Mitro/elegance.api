import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { isEmail } from 'class-validator';
import { LoginResponseDto } from '../dto/login-response.dto';
import { IUserRoleRepository } from '../../../user/domain/repositories/user-role.repository';
import { UserAccountNotVerifiedException } from '../../../../core/exceptions/user-account-not-verified.exception';
import { InvalidCredentialsException } from '../../../../core/exceptions/invalid-credentials.exception';
import { UserAggregateMapper } from '../../../user/application/mappers/user-aggregate-dto.mapper';

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
      throw new InvalidCredentialsException();
    }

    if (!user.isActive()) {
      throw new UserAccountNotVerifiedException();
    }

    const passwordValid = await this.passwordHasherService.compare(
      dto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new InvalidCredentialsException();
    }

    const roles = await this.userRoleRepository.getUserRoles(
      user.id.toString(),
    );

    const userAggregateDto = UserAggregateMapper.toDto(user, roles);

    const accessToken =
      await this.jwtAccessTokenStrategy.sign(userAggregateDto);
    const refreshToken =
      await this.jwtRefreshTokenStrategy.sign(userAggregateDto);

    return { accessToken, refreshToken, user: userAggregateDto };
  }
}
