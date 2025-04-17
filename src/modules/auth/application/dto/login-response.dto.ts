import { AuthUserDto } from './auth-user.dto';

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
