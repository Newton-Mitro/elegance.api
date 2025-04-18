import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetTokenEntity } from '../../domain/entities/reset-token.entity';
import { IResetTokenRepository } from '../../domain/interfaces/reset-token.repository';
import { NotifierService } from '../../../notification/infrastructure/services/notifier.service';
import { isEmail } from 'class-validator';
import { randomUUID } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly notifierService: NotifierService, // abstracted email sender
    @Inject('IResetTokenRepository')
    private readonly resetTokenRepository: IResetTokenRepository, // for creating/validating tokens
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<string> {
    const user = isEmail(dto.identifier)
      ? await this.userRepository.findByEmail(dto.identifier)
      : await this.userRepository.findByPhone(dto.identifier);

    if (!user) {
      // Don't reveal if phone number exists
      throw new NotFoundException(
        'If the phone number exists, instructions will be sent.',
      );
    }

    const token = randomUUID();
    const resetToken = ResetTokenEntity.create({
      phone: user.phone,
      token: token,
    });

    await this.resetTokenRepository.save(resetToken);

    if (user.email) {
      this.eventEmitter.emit(
        'user.registered',
        new UserRegisteredEvent(
          user.id.toString(),
          user.name ?? 'Customer',
          user.email.value,
          token,
        ),
      );
    }

    return token;
  }
}
