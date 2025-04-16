/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.usecase';

import { RegisterDto } from '../../application/dtos/register.dto';
import { LoginDto } from '../../application/dtos/login.dto';
import { RefreshTokenDto } from '../../application/dtos/refresh-token.dto';
import { ForgotPasswordDto } from '../../application/dtos/forgot-password.dto';
import { ResetPasswordDto } from '../../application/dtos/reset-password.dto';
import { VerifyEmailDto } from '../../application/dtos/verify-account.dto';
import { ForgotPasswordUseCase } from '../../application/use-cases/forgot-password.usecase';
import { ResetPasswordUseCase } from '../../application/use-cases/reset-password.usecase';
import { VerifyEmailUseCase } from '../../application/use-cases/verify-account.usecase';
import { LogoutUseCase } from '../../application/use-cases/logout.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly logoutUsecase: LogoutUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.registerUseCase.execute(dto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User successfully registered.',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Registration failed',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.loginUseCase.execute(dto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful.',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          error: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    try {
      const result = await this.refreshTokenUseCase.execute(dto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Token refreshed successfully.',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to refresh token',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('me')
  getMe(@Request() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User information retrieved successfully.',
      data: req.user,
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.logoutUsecase.execute(req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Logged out successfully.',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.forgotPasswordUseCase.execute(dto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset link sent.',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.resetPasswordUseCase.execute(dto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password has been reset successfully.',
    };
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    await this.verifyEmailUseCase.execute(dto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email has been verified successfully.',
    };
  }
}
