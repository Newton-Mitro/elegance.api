import { Account } from '@prisma/client';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Prisma } from '@prisma/client';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountType } from '../../domain/enums/account-type.enum';

export class AccountMapper {
  static toDomain(account: Account): AccountEntity {
    return AccountEntity.create(
      {
        name: account.name,
        code: account.code,
        type: account.type as AccountType,
        parentId: account.parentId ?? undefined,
        isGroup: account.isGroup,
        openingBalance: account.openingBalance.toNumber(),
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
      new UniqueEntityID(account.id),
    );
  }

  static toPersistence(
    entity: AccountEntity,
  ): Prisma.AccountUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      code: entity.code,
      type: entity.type,
      parentId: entity.parentId ?? null,
      isGroup: entity.isGroup,
      openingBalance: new Prisma.Decimal(entity.openingBalance),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
