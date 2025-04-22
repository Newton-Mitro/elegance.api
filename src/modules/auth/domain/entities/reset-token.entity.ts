import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface ResetTokenProps extends EntityBaseProps {
  identifier: string;
  token: string;
}

export class ResetTokenEntity extends Entity<ResetTokenProps> {
  private constructor(props: ResetTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get identifier(): string {
    return this.props.identifier;
  }

  get token(): string {
    return this.props.token;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  static create(props: ResetTokenProps, id?: UniqueEntityID): ResetTokenEntity {
    return new ResetTokenEntity(props, id);
  }
}
