import { AccountType } from '../../domain/enums/account-type.enum';

export interface CreateAccountDto {
  name: string;
  code: string;
  type: AccountType;
  parentId?: string;
  isGroup?: boolean;
  openingBalance?: number;
}

export interface UpdateAccountDto {
  name?: string;
  code?: string;
  type?: AccountType;
  parentId?: string | null;
  isGroup?: boolean;
  openingBalance?: number;
}

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
