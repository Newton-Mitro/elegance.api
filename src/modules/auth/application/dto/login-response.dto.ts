import { UserAggregateDto } from '../../../user/application/dto/user/user-aggregate.dto';

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserAggregateDto;
}
