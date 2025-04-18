import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserStatus } from '@prisma/client';
import { Email } from '../../../user/domain/value-objects/email.vo';
import { IUserRoleRepository } from '../../../user/domain/repositories/user-role.repository';
import { UserRoleEntity } from '../../../user/domain/entities/user-role.entity';
import { IRoleRepository } from '../../../user/domain/repositories/role.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';
import { randomUUID } from 'crypto';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
    @Inject('IVerifyTokenRepository')
    private readonly verifyTokenRepository: IVerifyTokenRepository,
    private readonly hasher: PasswordHasherService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: RegisterDto) {
    const phoneExists = await this.userRepository.findByPhone(dto.phone);
    if (phoneExists) throw new Error('Phone already registered');

    const hashedPassword = await this.hasher.hash(dto.password);
    const newUser = UserEntity.create({
      name: dto.fullName,
      email: dto.email ? Email.create(dto.email) : undefined,
      phone: dto.phone,
      password: hashedPassword,
      status: UserStatus.INACTIVE,
    });

    await this.userRepository.save(newUser);
    const role = await this.roleRepository.findByName('CUSTOMER');

    if (!role) {
      throw new NotFoundException();
    }

    const userRole = UserRoleEntity.create({
      userId: newUser.id.toString(),
      roleId: role.id.toString(),
      assignedAt: new Date(),
      reason: 'On Registration',
    });

    await this.userRoleRepository.assignRoleToUser(userRole);

    const token = randomUUID();
    const verifyTokenEntity = VerifyTokenEntity.create({
      userId: newUser.id.toString(),
      token: token,
    });
    await this.verifyTokenRepository.save(verifyTokenEntity);

    if (newUser.email) {
      this.eventEmitter.emit(
        'user.registered',
        new UserRegisteredEvent(
          newUser.id.toString(),
          newUser.name ?? 'Customer',
          newUser.email.value,
          token,
        ),
      );
    }
  }
}
