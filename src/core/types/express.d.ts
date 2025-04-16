import { UserAggregateDto } from '../../modules/user/application/dtos/user-aggregate.dto';

declare module 'express' {
  interface Request {
    user?: UserAggregateDto;
  }
}
