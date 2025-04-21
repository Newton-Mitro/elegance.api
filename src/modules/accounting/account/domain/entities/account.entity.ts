import { Entity } from '../../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../../core/entities/unique-entity-id';
import { AccountType } from '../enums/account-type.enum';

export interface AccountProps {
  name: string;
  code: string;
  type: AccountType;
  parentId?: string;
  isGroup: boolean;
  openingBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AccountEntity extends Entity<AccountProps> {
  private constructor(props: AccountProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: AccountProps, id?: UniqueEntityID): AccountEntity {
    return new AccountEntity(props, id);
  }

  get name() {
    return this.props.name;
  }
  get code() {
    return this.props.code;
  }
  get type() {
    return this.props.type;
  }
  get parentId() {
    return this.props.parentId;
  }
  get isGroup() {
    return this.props.isGroup;
  }
  get openingBalance() {
    return this.props.openingBalance;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  updateDetails(props: Partial<Omit<AccountProps, 'createdAt' | 'updatedAt'>>) {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.code !== undefined) this.props.code = props.code;
    if (props.type !== undefined) this.props.type = props.type;
    if (props.parentId !== undefined) this.props.parentId = props.parentId;
    if (props.isGroup !== undefined) this.props.isGroup = props.isGroup;
    if (props.openingBalance !== undefined)
      this.props.openingBalance = props.openingBalance;
  }

  setUpdatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
