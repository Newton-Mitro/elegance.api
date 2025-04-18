/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../../../config/types/config.type';
import { UserAggregateDto } from '../../../user/application/dto/user-aggregate.dto';

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
      throw new UnauthorizedException('Token invalid or expired');
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
      throw new UnauthorizedException('Token invalid or expired');
    }
  }
}
