/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtRefreshTokenStrategy } from '../services/jwt-refresh-token.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtRefreshTokenService: JwtRefreshTokenStrategy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken: string | undefined = request.body?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    try {
      const payload = await this.jwtRefreshTokenService.verify(refreshToken);
      request.user = payload;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
