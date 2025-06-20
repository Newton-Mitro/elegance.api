/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../../../config/types/config.type';
import { UserAggregateDto } from '../../../user/application/dto/user/user-aggregate.dto';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';

@Injectable()
export class JwtAccessTokenStrategy implements IJwtService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async sign(payload: UserAggregateDto): Promise<string> {
    console.log('SIGNING PAYLOAD:', payload);
    try {
      const jwt = this.configService.get<JwtConfig>('jwt')!;
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwt.secret,
        expiresIn: jwt.exp,
        subject: 'refresh-token',
        issuer: jwt.issuer,
        audience: jwt.audience,
      });
      return refreshToken;
    } catch (err) {
      console.log(err);
      throw new InvalidTokenException();
    }
  }

  async verify(token: string): Promise<UserAggregateDto> {
    try {
      const jwt = this.configService.get<JwtConfig>('jwt')!;
      return this.jwtService.verifyAsync(token, {
        secret: jwt.secret,
        issuer: jwt.issuer,
        audience: jwt.audience,
      });
    } catch (err) {
      console.log(err);
      throw new InvalidTokenException();
    }
  }
}
