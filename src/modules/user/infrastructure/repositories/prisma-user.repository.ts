import { Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserFilter,
  UserPaginationParams,
} from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserEntityMapper } from '../mappers/user.mapper';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Paginate } from '../../../../core/types/paginate.type';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause(filter?: UserFilter) {
    if (!filter) return undefined;

    return {
      AND: [
        filter.name
          ? { name: { contains: filter.name, mode: 'insensitive' } }
          : {},
        filter.email
          ? { email: { contains: filter.email, mode: 'insensitive' } }
          : {},
      ],
    };
  }

  async findPaginated(
    params: UserPaginationParams,
  ): Promise<Paginate<UserEntity>> {
    const {
      page,
      limit,
      filter,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filter);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: data.map((user) => UserEntityMapper.toDomain(user)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { id: id },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { phone },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async save(user: UserEntity, tx?: Prisma.TransactionClient): Promise<void> {
    const data = UserEntityMapper.toPersistence(user);
    const prisma = tx ?? this.prisma;

    await prisma.user.upsert({
      where: { id: user.id.toString() },
      update: data,
      create: data,
    });

    // Optionally update roles if needed
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const prisma = tx ?? this.prisma;

    await prisma.user.delete({ where: { id: id.toString() } });
  }
}
