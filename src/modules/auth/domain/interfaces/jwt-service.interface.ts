import { AuthUserDto } from '../../application/dto/auth-user.dto';

export interface IJwtService {
  sign(payload: AuthUserDto): Promise<string>;
  verify(token: string): Promise<AuthUserDto>;
}
