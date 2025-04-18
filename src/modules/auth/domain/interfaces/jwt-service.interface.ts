import { UserAggregateDto } from '../../../user/application/dto/user-aggregate.dto';

export interface IJwtService {
  sign(payload: UserAggregateDto): Promise<string>;
  verify(token: string): Promise<UserAggregateDto>;
}
