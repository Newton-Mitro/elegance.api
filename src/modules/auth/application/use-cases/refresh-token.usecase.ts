import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<any> {
    try {
      const decodedUser = await this.jwtRefreshTokenStrategy.verify(
        dto.refreshToken,
      );

      const user = await this.userRepository.findById(decodedUser.id);
      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = decodedUser;

      const newAccessToken = await this.jwtRefreshTokenStrategy.sign(payload);

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
