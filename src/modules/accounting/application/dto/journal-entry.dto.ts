export interface JournalEntryDto {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
  memo?: string;
  createdAt: Date;
  updatedAt: Date;
}
