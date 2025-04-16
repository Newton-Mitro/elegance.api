import { UserEntity } from '../../modules/user/domain/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: UserEntity;
  }
}
