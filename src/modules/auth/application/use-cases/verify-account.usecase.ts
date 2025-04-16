import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { VerifyEmailDto } from '../dtos/verify-account.dto';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    private readonly IUserRepository: IUserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: VerifyEmailDto): Promise<any> {
    const userId = this.tokenService.verifyEmailToken(dto.token);

    await this.IUserRepository.verifyEmail(userId);

    return { message: 'Email verified successfully' };
  }
}
