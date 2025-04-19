import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';
import { isEmail } from 'class-validator';
import { SendVerificationLinkDto } from '../dto/send-verification-link.dto';
import { SendVerificationLinkEvent } from '../../domain/events/send-verification-link.event';
import { InstructionIfIdentifierExistsException } from '../../../../core/exceptions/instruction-if-identifier-exists.exception';

@Injectable()
export class SendVerificationLinkUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IVerifyTokenRepository')
    private readonly verifyTokenRepository: IVerifyTokenRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: SendVerificationLinkDto) {
    const user = isEmail(dto.identifier)
      ? await this.userRepository.findByEmail(dto.identifier)
      : await this.userRepository.findByPhone(dto.identifier);

    if (!user) {
      // Don't reveal if phone number exists
      throw new InstructionIfIdentifierExistsException();
    }

    const token = randomUUID();
    const verifyTokenEntity = VerifyTokenEntity.create({
      userId: user.id.toString(),
      token: token,
    });
    await this.verifyTokenRepository.save(verifyTokenEntity);

    if (user.email) {
      this.eventEmitter.emit(
        'send-verify.email',
        new SendVerificationLinkEvent(
          user.id.toString(),
          user.name ?? 'Customer',
          user.email.value,
          token,
        ),
      );
    }
  }
}
