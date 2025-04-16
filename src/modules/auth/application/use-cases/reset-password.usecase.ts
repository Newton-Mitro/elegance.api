import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly IUserRepository: IUserRepository,
    private readonly tokenService: TokenService,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<any> {
    const userId = this.tokenService.verifyResetToken(dto.token); // throws if invalid

    const hashedPassword = await this.passwordHasherService.hash(
      dto.newPassword,
    );
    await this.IUserRepository.updatePassword(userId, hashedPassword);

    return { message: 'Password successfully reset' };
  }
}
