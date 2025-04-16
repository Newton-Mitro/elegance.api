import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: IJwtService,
    private readonly hasher: PasswordHasherService,
  ) {}

  async execute(dto: LoginDto): Promise<any> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await this.hashService.compare(
      dto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const jwt = this.configService.get('jwt');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwt.secret,
      expiresIn: jwt.exp,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwt.refSecret,
      expiresIn: jwt.refExp,
    });

    return { accessToken, refreshToken, user };
  }
}
