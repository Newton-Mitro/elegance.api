import { UserResponseDto } from '../../modules/user/application/dtos/user-response.dto';

declare module 'express' {
  interface Request {
    user?: UserResponseDto;
  }
}
