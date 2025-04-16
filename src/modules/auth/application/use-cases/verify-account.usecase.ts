import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { VerifyEmailDto } from '../dtos/verify-account.dto';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: VerifyEmailDto): Promise<any> {
    const userId = this.tokenService.verifyEmailToken(dto.token);

    await this.userRepository.verifyEmail(userId);

    return { message: 'Email verified successfully' };
  }
}
