import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtConfig } from '../../config/types/config.type';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { PasswordHasherService } from './domain/services/password-hasher.service';
import { JwtAccessTokenStrategy } from './infrastructure/services/jwt-access-token.service';
import { JwtRefreshTokenStrategy } from './infrastructure/services/jwt-refresh-token.service';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { LogoutUseCase } from './application/use-cases/logout.usecase';
import { ForgotPasswordUseCase } from './application/use-cases/forgot-password.usecase';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.usecase';
import { VerifyEmailUseCase } from './application/use-cases/verify-account.usecase';

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
  providers: [
    LoginUseCase,
    RegisterUseCase,
    LogoutUseCase,
    ForgotPasswordUseCase,
    RefreshTokenUseCase,
    ResetPasswordUseCase,
    VerifyEmailUseCase,
    PasswordHasherService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    // { provide: 'IJwtService', useClass: JwtAccessTokenStrategy },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
