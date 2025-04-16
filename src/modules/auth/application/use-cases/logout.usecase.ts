import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute(userId: string): Promise<any> {
    await this.tokenService.invalidateRefreshTokens(userId); // e.g., delete from Redis

    return { message: 'Logged out successfully' };
  }
}
