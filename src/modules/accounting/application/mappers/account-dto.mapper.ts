import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountDto } from '../dto/account.dto';

export class AccountMapper {
  static toDto(entity: AccountEntity): AccountDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      code: entity.code,
      type: entity.type,
      parentId: entity.parentId,
      isGroup: entity.isGroup,
      openingBalance: entity.openingBalance,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toDtoList(entities: AccountEntity[]): AccountDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
