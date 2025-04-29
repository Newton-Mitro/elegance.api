import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';
import { UnauthorizedAccessException } from '../../../../core/exceptions/unauthorized-access.exception';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { IUserRoleRepository } from '../../../user/domain/repositories/user-role.repository';
import { UserAggregateMapper } from '../../../user/application/mappers/user-aggregate-dto.mapper';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<{ accessToken: string }> {
    try {
      const decodedUser = await this.jwtRefreshTokenStrategy.verify(
        dto.refreshToken,
      );

      const refreshToken = await this.refreshTokenRepository.findByToken(
        dto.refreshToken,
      );
      if (!refreshToken) {
        throw new InvalidTokenException();
      }

      const user = await this.userRepository.findById(decodedUser.id);

      const roles = await this.userRoleRepository.getUserRoles(decodedUser.id);

      if (!user) {
        throw new InvalidTokenException();
      }

      const payload = UserAggregateMapper.toDto(user, roles);

      const newAccessToken = await this.jwtAccessTokenStrategy.sign(payload);

      return { accessToken: newAccessToken };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedAccessException();
    }
  }
}
