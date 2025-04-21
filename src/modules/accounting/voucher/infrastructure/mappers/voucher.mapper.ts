import { Voucher, JournalEntry } from '@prisma/client';
import {
  VoucherEntity,
  JournalEntryEntity,
} from '../../../voucher/domain/entities/voucher.entity';
import { VoucherType } from '../../../voucher/domain/enums/voucher-type.enum';
import { VoucherStatus } from '../../../voucher/domain/enums/voucher-status.enum';
import { UniqueEntityID } from '../../../../../core/entities/unique-entity-id';
import { Decimal } from '@prisma/client/runtime/library';

export class VoucherMapper {
  static toPersistence(
    entity: VoucherEntity,
  ): Voucher & { entries: JournalEntry[] } {
    return {
      id: entity.id.toString(),
      type: entity.type as VoucherType,
      status: entity.status as VoucherStatus,
      date: entity.date,
      reference: entity.reference ?? null,
      narration: entity.narration ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      entries: entity.entries.map((e) => ({
        id: e.id.toString(),
        voucherId: entity.id.toString(),
        accountId: e.accountId,
        debit: new Decimal(e.debit),
        credit: new Decimal(e.credit),
        memo: e.memo ?? null,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      })),
    };
  }

  static toDomain(data: Voucher & { entries: JournalEntry[] }): VoucherEntity {
    const entries = data.entries.map((e) =>
      JournalEntryEntity.create(
        {
          accountId: e.accountId,
          debit: Number(e.debit),
          credit: Number(e.credit),
          memo: e.memo ?? undefined,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt,
        },
        new UniqueEntityID(e.id),
      ),
    );

    return VoucherEntity.create(
      {
        type: data.type,
        status: data.status,
        date: data.date,
        reference: data.reference ?? undefined,
        narration: data.narration ?? undefined,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        entries,
      },
      new UniqueEntityID(data.id),
    );
  }
}
