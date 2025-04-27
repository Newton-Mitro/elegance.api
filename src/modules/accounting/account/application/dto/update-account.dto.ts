import { AccountType } from '../../domain/enums/account-type.enum';

export interface UpdateAccountDto {
  name?: string;
  code?: string;
  type?: AccountType;
  parentId?: string | null;
  isGroup?: boolean;
  openingBalance?: number;
}
