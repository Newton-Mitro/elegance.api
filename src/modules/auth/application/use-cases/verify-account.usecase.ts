import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { VerifyEmailDto } from '../dtos/verify-account.dto';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IVerifyTokenRepository')
    private readonly verifyTokenRepository: IVerifyTokenRepository,
  ) {}

  async execute(dto: VerifyEmailDto): Promise<any> {
    const verifyToken = await this.verifyTokenRepository.findByToken(dto.token);

    if (!verifyToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findById(
      new UniqueEntityID(verifyToken.userId),
    );

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.activate();

    await this.userRepository.save(user);

    return { message: 'Email verified successfully' };
  }
}
