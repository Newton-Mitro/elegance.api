import { UserStatus } from '@prisma/client';

export class RoleDto {
  id: string;
  name: string;
  description?: string;
}

export class UserWithRolesDto {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  profilePictureUrl: string | null;
  status: UserStatus;
  createdAt: Date;
  roles: RoleDto[];
}
