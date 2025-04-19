import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';
import { UserNotFoundException } from '../../../../core/exceptions/user-not-found.exception';
import { AccountAlreadyVerifiedException } from '../../../../core/exceptions/account-already-verified.exception';

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
    const resetToken = await this.resetTokenRepository.findByToken(dto.token); // throws if invalid

    if (!resetToken) {
      throw new InvalidTokenException();
    }

    const user = await this.userRepository.findByPhone(resetToken.phone);

    if (!user) {
      throw new UserNotFoundException();
    }
    if (user.isActive()) {
      throw new AccountAlreadyVerifiedException();
    }

    const hashedPassword = await this.passwordHasherService.hash(
      dto.newPassword,
    );

    user.setPassword(hashedPassword);

    await this.userRepository.save(user);

    return { message: 'Password successfully reset' };
  }
}
