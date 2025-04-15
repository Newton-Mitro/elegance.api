import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtConfig } from '../../config/types/config.type';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('jwt')!;
        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.exp,
            audience: jwtConfig.audience,
            issuer: jwtConfig.issuer,
            subject: 'access-token',
            algorithm: 'HS256',
          },
        };
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
