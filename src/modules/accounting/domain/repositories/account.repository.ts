// domain/repositories/account.repository.ts
import { AccountEntity } from '../entities/account.entity';

export interface IAccountRepository {
  findById(id: string): Promise<AccountEntity | null>;
  findByCode(code: string): Promise<AccountEntity | null>;
  create(account: AccountEntity, tx?: any): Promise<void>;
  update(account: AccountEntity, tx?: any): Promise<void>;
  delete(id: string, tx?: any): Promise<void>;
}
