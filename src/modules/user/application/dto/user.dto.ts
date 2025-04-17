import { UserStatus } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  profilePictureUrl: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
