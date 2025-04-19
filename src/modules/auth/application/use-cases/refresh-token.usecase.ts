import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';
import { UnauthorizedAccessException } from '../../../../core/exceptions/unauthorized-access.exception';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    private readonly jwtAccessTokenStrategy: JwtAccessTokenStrategy,
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
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

      const payload = {
        id: decodedUser.id,
        name: decodedUser.name,
        phone: decodedUser.phone,
        email: decodedUser.email,
        profilePictureUrl: decodedUser.profilePictureUrl,
        status: decodedUser.status,
        createdAt: decodedUser.createdAt,
        updatedAt: decodedUser.updatedAt,
        roles: decodedUser.roles,
      };

      const newAccessToken = await this.jwtAccessTokenStrategy.sign(payload);

      return { accessToken: newAccessToken };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedAccessException();
    }
  }
}
