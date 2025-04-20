import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';
import { JwtRefreshTokenStrategy } from '../../infrastructure/strategies/jwt-refresh-token.strategy';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtRefreshTokenStrategy: JwtRefreshTokenStrategy,
  ) {}

  async execute(userId: string): Promise<any> {
    const refreshToken = await this.refreshTokenRepository.findByUserId(
      new UniqueEntityID(userId),
    );
    if (!refreshToken) {
      throw new InvalidTokenException();
    }

    await this.refreshTokenRepository.deleteByUserId(
      new UniqueEntityID(userId),
    );
    return { message: 'Logged out successfully' };
  }
}
