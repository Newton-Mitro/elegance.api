import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAccessTokenStrategy } from '../strategies/jwt-access-token.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtAccessTokenService: JwtAccessTokenStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const payload = await this.jwtAccessTokenService.verify(token);
      request.user = payload; // Attach user to request
      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token invalid or expired');
    }
  }
}
