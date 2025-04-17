import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { AuthUserMapper } from '../mappers/auth-user.mapper';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<{ accessToken: string }> {
    try {
      const decodedUser = await this.jwtRefreshTokenStrategy.verify(
        dto.refreshToken,
      );

      const user = await this.userRepository.findById(
        new UniqueEntityID(decodedUser.id),
      );
      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = AuthUserMapper.toAuthUserDto(user);

      const newAccessToken = await this.jwtAccessTokenStrategy.sign(payload);

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
