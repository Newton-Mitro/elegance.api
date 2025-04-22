import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserStatus } from '@prisma/client';
import { IUserRoleRepository } from '../../../user/domain/repositories/user-role.repository';
import { UserRoleEntity } from '../../../user/domain/entities/user-role.entity';
import { IRoleRepository } from '../../../user/domain/repositories/role.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../../domain/events/user-registered.event';
import { randomUUID } from 'crypto';
import { IVerifyTokenRepository } from '../../domain/interfaces/verify-token.repository';
import { VerifyTokenEntity } from '../../domain/entities/verify-token.entity';
import { isEmail } from 'class-validator';
import { UserAlreadyRegisteredException } from '../../../../core/exceptions/user-already-registered.exception';
import { PrismaService } from '../../../../core/prisma/prisma.service'; // import PrismaService
import { Prisma } from '@prisma/client'; // for tx type
import { ResourceNotFoundException } from '../../../../core/exceptions/resource-not-found.exception';
import { Email } from '../../../user/domain/value-objects/email.vo';

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
    private readonly prisma: PrismaService, // inject PrismaService
  ) {}

  async execute(dto: RegisterDto) {
    const isEmailIdentifier = isEmail(dto.identifier);
    const user = isEmailIdentifier
      ? await this.userRepository.findByEmail(dto.identifier)
      : await this.userRepository.findByPhone(dto.identifier);

    if (user) throw new UserAlreadyRegisteredException();

    const hashedPassword = await this.hasher.hash(dto.password);

    await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create user
      const newUser = UserEntity.create({
        name: dto.name,
        email: isEmailIdentifier ? Email.create(dto.identifier) : undefined,
        phone: !isEmailIdentifier ? dto.identifier : undefined,
        password: hashedPassword,
        status: UserStatus.INACTIVE,
      });

      await this.userRepository.save(newUser, tx);

      const role = await this.roleRepository.findByName('CUSTOMER');
      if (!role) throw new ResourceNotFoundException();

      const userRole = UserRoleEntity.create({
        userId: newUser.id.toString(),
        roleId: role.id.toString(),
        assignedAt: new Date(),
        reason: 'On Registration',
      });

      await this.userRoleRepository.assignRoleToUser(userRole, tx);

      const token = randomUUID();
      const verifyTokenEntity = VerifyTokenEntity.create({
        userId: newUser.id.toString(),
        token,
      });

      await this.verifyTokenRepository.save(verifyTokenEntity, tx);

      // Emit event *after* transaction completes
      setImmediate(() => {
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
      });
    });
  }
}
