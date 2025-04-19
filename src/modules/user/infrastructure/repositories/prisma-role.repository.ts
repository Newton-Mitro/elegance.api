import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../domain/entities/role.entity';
import { IRoleRepository } from '../../domain/repositories/role.repository';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { RoleEntityMapper } from '../mappers/role.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({ where: { id } });
    return role ? RoleEntityMapper.toDomain(role) : null;
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({ where: { name } });
    return role ? RoleEntityMapper.toDomain(role) : null;
  }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((role) => RoleEntityMapper.toDomain(role));
  }

  async create(
    role: RoleEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<RoleEntity> {
    const client = tx ?? this.prisma;
    const created = await client.role.create({
      data: {
        id: role.id.toString(),
        name: role.name,
        description: role.description,
      },
    });
    return RoleEntityMapper.toDomain(created);
  }

  async update(
    role: RoleEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<RoleEntity> {
    const client = tx ?? this.prisma;
    const updated = await client.role.update({
      where: { id: role.id.toString() },
      data: {
        name: role.name,
        description: role.description,
      },
    });
    return RoleEntityMapper.toDomain(updated);
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.prisma;
    await client.role.delete({ where: { id } });
  }
}
