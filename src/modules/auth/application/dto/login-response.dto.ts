import { UserAggregateDto } from '../../../user/application/dto/user-aggregate.dto';

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserAggregateDto;
}
