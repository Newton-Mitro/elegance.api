import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly IUserRepository: IUserRepository,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<any> {
    const jwt = this.configService.get('jwt');

    try {
      const decoded = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: jwt.refSecret,
      });

      const user = await this.IUserRepository.findById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, email: user.email };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        secret: jwt.secret,
        expiresIn: jwt.exp,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
