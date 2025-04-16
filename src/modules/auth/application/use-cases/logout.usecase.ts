import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../infrastructure/repositories/prisma-refresh-token.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    await this.refreshTokenRepository.deleteByUserId(userId);
    return { message: 'Logged out successfully' };
  }
}
