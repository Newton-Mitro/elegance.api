import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { IRefreshTokenRepository } from '../../domain/interfaces/refresh-token.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    await this.refreshTokenRepository.deleteByUserId(
      new UniqueEntityID(userId),
    );
    return { message: 'Logged out successfully' };
  }
}
