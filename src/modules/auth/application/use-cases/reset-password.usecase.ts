import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IResetTokenRepository')
    private readonly resetTokenRepository: IResetTokenRepository,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<any> {
    const resetToken = await this.resetTokenRepository.findByPhone(dto.token); // throws if invalid

    if (!resetToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findByPhone(resetToken.phone);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const hashedPassword = await this.passwordHasherService.hash(
      dto.newPassword,
    );

    user.setPassword(hashedPassword);

    await this.userRepository.save(user);

    return { message: 'Password successfully reset' };
  }
}
