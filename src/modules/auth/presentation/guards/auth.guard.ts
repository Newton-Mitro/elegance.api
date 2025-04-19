// auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtAccessTokenStrategy } from '../../infrastructure/strategies/jwt-access-token.strategy';
import { IS_PUBLIC_KEY } from '../../../../core/decorators/public.decorator';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtAccessTokenService: JwtAccessTokenStrategy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new InvalidTokenException();
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const payload = await this.jwtAccessTokenService.verify(token);
      request.user = payload;
      return true;
    } catch (err) {
      console.log(err);
      throw new InvalidTokenException();
    }
  }
}
