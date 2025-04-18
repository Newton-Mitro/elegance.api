import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtConfig } from '../../config/types/config.type';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { PasswordHasherService } from './domain/services/password-hasher.service';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { LogoutUseCase } from './application/use-cases/logout.usecase';
import { ForgotPasswordUseCase } from './application/use-cases/forgot-password.usecase';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.usecase';
import { VerifyEmailUseCase } from './application/use-cases/verify-account.usecase';
import { JwtAccessTokenStrategy } from './infrastructure/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/strategies/jwt-refresh-token.strategy';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PrismaRefreshTokenRepository } from './infrastructure/repositories/prisma-refresh-token.repository';
import { NotificationModule } from '../notification/notification.module';
import { PrismaResetTokenRepository } from './infrastructure/repositories/prisma-reset-token.repository';
import { PrismaVerifyTokenRepository } from './infrastructure/repositories/prisma-verify-token.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './presentation/guards/auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';
import { WelcomeEmailListener } from './infrastructure/listeners/welcome-email.listener';
import { ResetPasswordListener } from './infrastructure/listeners/reset-password.listener';
import { SendVerificationLinkListener } from './infrastructure/listeners/send-verification-link.listener';
import { SendVerificationLinkUseCase } from './application/use-cases/send-verification-link.usecase';

@Module({
  imports: [
    NotificationModule,
    UserModule,
    PrismaModule,
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
    SendVerificationLinkUseCase,
    RefreshTokenUseCase,
    ResetPasswordUseCase,
    VerifyEmailUseCase,
    PasswordHasherService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: 'IVerifyTokenRepository',
      useClass: PrismaVerifyTokenRepository,
    },
    {
      provide: 'IRefreshTokenRepository',
      useClass: PrismaRefreshTokenRepository,
    },
    {
      provide: 'IResetTokenRepository',
      useClass: PrismaResetTokenRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    WelcomeEmailListener,
    ResetPasswordListener,
    SendVerificationLinkListener,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
