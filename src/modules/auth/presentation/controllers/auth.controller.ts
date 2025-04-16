import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.usecase';
import { RegisterDto } from '../../application/dtos/register.dto';
import { LoginDto } from '../../application/dtos/login.dto';
import { RefreshTokenDto } from '../../application/dtos/refresh-token.dto';
import { ForgotPasswordDto } from '../../application/dtos/forgot-password.dto';
import { ResetPasswordDto } from '../../application/dtos/reset-password.dto';
import { VerifyEmailDto } from '../../application/dtos/verify-account.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(dto);
  }

  @Get('me')
  async getMe(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req) {
    // Handle logout (invalidate token if stored)
    return { message: 'Logged out' };
  }

  // Optional endpoints
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    // trigger email or SMS
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    // update password
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    // email verification logic
  }
}
