/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../../../config/types/config.type';
import { AuthUserDto } from '../../application/dto/auth-user.dto';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';

@Injectable()
export class JwtRefreshTokenStrategy implements IJwtService {
  constructor(
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async sign(payload: AuthUserDto): Promise<string> {
    try {
      const jwt = this.configService.get<JwtConfig>('jwt')!;
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwt.secret,
        expiresIn: jwt.refExp,
        subject: 'refresh-token',
        issuer: jwt.issuer,
        audience: jwt.audience,
      });
      if (refreshToken) {
        const refreshTokenEntity = RefreshTokenEntity.create({
          userId: payload.id,
          token: refreshToken,
          expiresAt: new Date(),
        });
        await this.refreshTokenRepository.save(refreshTokenEntity);
      }

      return refreshToken;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token invalid or expired');
    }
  }

  async verify(token: string): Promise<AuthUserDto> {
    try {
      const jwt = this.configService.get<JwtConfig>('jwt')!;
      if (!token || typeof token !== 'string') {
        console.error('No token provided or token is not a string:', token);
        throw new UnauthorizedException('Token missing or malformed');
      }

      console.log('Verifying token:', token); // helpful log
      return this.jwtService.verifyAsync(token, {
        secret: jwt.secret,
        issuer: jwt.issuer,
        audience: jwt.audience,
      });
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token invalid or expired');
    }
  }
}
