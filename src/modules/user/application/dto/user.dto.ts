import { UserStatus } from '@prisma/client';

export class UserDto {
  id: string;
  name?: string;
  phone: string;
  email?: string;
  profilePictureUrl?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
