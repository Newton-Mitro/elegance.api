import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserStatus } from '@prisma/client';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: IJwtService,
    private readonly hasher: PasswordHasherService,
  ) {}

  async execute(dto: RegisterDto) {
    const emailExists = await this.userRepo.findByPhone(dto.phone);
    if (emailExists) throw new Error('Phone already registered');

    const hashedPassword = await this.hasher.hash(dto.password);
    const newUser = UserEntity.create({
      phone: dto.phone,
      password: hashedPassword,
      status: UserStatus.INACTIVE,
    });

    await this.userRepo.save(newUser);

    const token = await this.jwtService.sign({ userId: newUser.id });

    return {
      accessToken: token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
