import { UserStatus } from '@prisma/client';

export class RoleDto {
  id: string;
  name: string;
  description?: string;
}

export class UserAggregateDto {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  profilePictureUrl?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  roles: RoleDto[];
}
