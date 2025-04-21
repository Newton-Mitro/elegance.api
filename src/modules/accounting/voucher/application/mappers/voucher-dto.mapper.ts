import { VoucherEntity } from '../../domain/entities/voucher.entity';

export class VoucherDtoMapper {
  static toDto(entity: VoucherEntity) {
    return {
      id: entity.id.toString(),
      type: entity.type,
      status: entity.status,
      date: entity.date,
      reference: entity.reference,
      narration: entity.narration,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      entries: entity.entries.map((e) => ({
        id: e.id.toString(),
        accountId: e.accountId,
        debit: e.debit,
        credit: e.credit,
        memo: e.memo,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      })),
    };
  }

  static toDtos(entities: VoucherEntity[]) {
    return entities.map((entity) => this.toDto(entity));
  }
}
