import { AccountType } from '../../domain/enums/account-type.enum';

export interface CreateAccountDto {
  name: string;
  code: string;
  type: AccountType;
  parentId?: string;
  isGroup?: boolean;
  openingBalance?: number;
}
