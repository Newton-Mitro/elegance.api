import { Entity } from '../../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../../core/entities/unique-entity-id';

export interface JournalEntryProps {
  accountId: string;
  debit: number;
  credit: number;
  memo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class JournalEntryEntity extends Entity<JournalEntryProps> {
  private constructor(props: JournalEntryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: JournalEntryProps, id?: UniqueEntityID) {
    return new JournalEntryEntity(props, id);
  }

  get accountId() {
    return this.props.accountId;
  }
  get debit() {
    return this.props.debit;
  }
  get credit() {
    return this.props.credit;
  }
  get memo() {
    return this.props.memo;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}

export interface VoucherProps {
  type: string;
  status: string;
  date: Date;
  reference?: string;
  narration?: string;
  createdAt: Date;
  updatedAt: Date;
  entries: JournalEntryEntity[];
}

export class VoucherEntity extends Entity<VoucherProps> {
  private constructor(props: VoucherProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: VoucherProps, id?: UniqueEntityID) {
    return new VoucherEntity(props, id);
  }

  get type() {
    return this.props.type;
  }
  get status() {
    return this.props.status;
  }
  get date() {
    return this.props.date;
  }
  get reference() {
    return this.props.reference;
  }
  get narration() {
    return this.props.narration;
  }
  get entries() {
    return this.props.entries;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}
