import { AccountType } from '../../domain/enums/account-type.enum';

export interface AccountDto {
  id: string;
  name: string;
  code: string;
  type: AccountType;
  parentId?: string;
  isGroup: boolean;
  openingBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
