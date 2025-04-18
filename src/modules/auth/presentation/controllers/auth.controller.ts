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
import { Public } from '../../../../core/decorators/public.decorator';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { SendVerificationLinkDto } from '../../application/dto/send-verification-link.dto';
import { SendVerificationLinkUseCase } from '../../application/use-cases/send-verification-link.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly sendVerificationLinkUseCase: SendVerificationLinkUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly logoutUsecase: LogoutUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.registerUseCase.execute(dto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered.',
      data: result,
    });
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.loginUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Login successful.',
      data: result,
    });
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto, @Res() res: Response) {
    const result = await this.refreshTokenUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Token refreshed successfully.',
      data: result,
    });
  }

  @Get('me')
  @Roles(Role.CUSTOMER, Role.ADMIN)
  getMe(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to get user info.',
      });
    }
    const user = req.user;
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles,
    };
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User information retrieved successfully.',
      data: payload,
    });
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('Invalid token.');
    }
    await this.logoutUsecase.execute(req.user?.id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Logged out successfully.',
    });
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Res() res: Response) {
    const result = await this.forgotPasswordUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Password reset link sent.',
      data: result,
    });
  }

  @Public()
  @Post('send-verification-link')
  async sendVerifyLink(
    @Body() dto: SendVerificationLinkDto,
    @Res() res: Response,
  ) {
    const result = await this.sendVerificationLinkUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Verification link sent.',
      data: result,
    });
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res: Response) {
    await this.resetPasswordUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Password has been reset successfully.',
    });
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto, @Res() res: Response) {
    await this.verifyEmailUseCase.execute(dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Email has been verified successfully.',
    });
  }
}
