import { AuthUserDto } from '../../modules/auth/application/dto/auth-user.dto';

declare module 'express' {
  interface Request {
    user?: AuthUserDto;
  }
}
