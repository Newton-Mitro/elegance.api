import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ForgotPasswordDto } from '../../application/dto/forgot-password.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { RefreshTokenDto } from '../../application/dto/refresh-token.dto';
import { RegisterDto } from '../../application/dto/register.dto';
import { ResetPasswordDto } from '../../application/dto/reset-password.dto';
import { VerifyEmailDto } from '../../application/dto/verify-account.dto';
import { ForgotPasswordUseCase } from '../../application/use-cases/forgot-password.usecase';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { LogoutUseCase } from '../../application/use-cases/logout.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.usecase';
import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { ResetPasswordUseCase } from '../../application/use-cases/reset-password.usecase';
import { VerifyEmailUseCase } from '../../application/use-cases/verify-account.usecase';

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
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    try {
      const result = await this.registerUseCase.execute(dto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User successfully registered.',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Registration failed.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.loginUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful.',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Invalid credentials.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto, @Res() res: Response) {
    try {
      const result = await this.refreshTokenUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        message: 'Token refreshed successfully.',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Failed to refresh token.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Get('me')
  getMe(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        message: 'User information retrieved successfully.',
        data: req.user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to get user info.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Invalid token.');
      }
      await this.logoutUsecase.execute(req.user?.id);
      return res.status(HttpStatus.OK).json({
        message: 'Logged out successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Logout failed.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Res() res: Response) {
    try {
      await this.forgotPasswordUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        message: 'Password reset link sent.',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Failed to send password reset link.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res: Response) {
    try {
      await this.resetPasswordUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        message: 'Password has been reset successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Failed to reset password.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto, @Res() res: Response) {
    try {
      await this.verifyEmailUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        message: 'Email has been verified successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Email verification failed.',
          error: error.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unknown error occurred.',
      });
    }
  }
}
