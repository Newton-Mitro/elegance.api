import { UserAggregateDto } from '../../modules/user/application/dto/user/user-aggregate.dto';

declare module 'express' {
  interface Request {
    user?: UserAggregateDto;
  }
}
