import { Injectable } from '@nestjs/common';
import { IUserRoleRepository } from '../../domain/repositories/user-role.repository';
import { UserRoleEntity } from '../../domain/entities/user-role.entity';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { RoleEntity } from '../../domain/entities/role.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

@Injectable()
export class PrismaUserRoleRepository implements IUserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async assignRoleToUser(userRole: UserRoleEntity): Promise<void> {
    await this.prisma.userRoles.create({
      data: {
        userId: userRole.userId,
        roleId: userRole.roleId,
        assignedAt: userRole.assignedAt,
        assignedBy: userRole.assignedBy,
        reason: userRole.reason,
      },
    });
  }

  async revokeRoleFromUser(userRole: UserRoleEntity): Promise<void> {
    await this.prisma.userRoles.update({
      where: {
        userId_roleId: {
          userId: userRole.userId,
          roleId: userRole.roleId,
        },
      },
      data: {
        revokedAt: userRole.revokedAt,
        revokedBy: userRole.revokedBy,
        reason: userRole.reason,
      },
    });
  }

  async getUserRoles(userId: string): Promise<RoleEntity[]> {
    const userRoles = await this.prisma.userRoles.findMany({
      where: { userId, revokedAt: null },
      include: { role: true },
    });

    return userRoles.map((ur) =>
      RoleEntity.create(
        {
          name: ur.role.name,
          description: ur.role.description ?? undefined,
          createdAt: ur.role.createdAt,
          updatedAt: ur.role.updatedAt,
        },
        new UniqueEntityID(ur.role.id),
      ),
    );
  }

  async hasRole(userId: string, roleId: string): Promise<boolean> {
    const count = await this.prisma.userRoles.count({
      where: {
        userId,
        roleId,
        revokedAt: null,
      },
    });

    return count > 0;
  }
}
