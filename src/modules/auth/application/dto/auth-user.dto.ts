import { RoleDto } from '../../../user/application/dto/user-aggregate.dto';

export interface AuthUserDto {
  id: string;
  name?: string;
  email?: string;
  phone: string;
  profilePictureUrl?: string;
  roles?: RoleDto[];
}
