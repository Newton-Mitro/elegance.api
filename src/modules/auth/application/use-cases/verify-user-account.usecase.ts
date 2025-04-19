import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { VerifyUserAccountDto } from '../dto/verify-account.dto';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { InvalidTokenException } from '../../../../core/exceptions/invalid-token.exception';
import { UserNotFoundException } from '../../../../core/exceptions/user-not-found.exception';

@Injectable()
export class VerifyUserAccountUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IVerifyTokenRepository')
    private readonly verifyTokenRepository: IVerifyTokenRepository,
  ) {}

  async execute(dto: VerifyUserAccountDto): Promise<any> {
    const verifyToken = await this.verifyTokenRepository.findByToken(dto.token);

    if (!verifyToken) {
      throw new InvalidTokenException();
    }

    const user = await this.userRepository.findById(
      new UniqueEntityID(verifyToken.userId),
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    user.activate();

    await this.userRepository.save(user);

    return { message: 'Email verified successfully' };
  }
}
