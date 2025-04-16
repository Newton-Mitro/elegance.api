import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface VerifyTokenProps extends EntityBaseProps {
  userId: string;
  token: string;
}

export class VerifyTokenEntity extends Entity<VerifyTokenProps> {
  private constructor(props: VerifyTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get token(): string {
    return this.props.token;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  static create(
    props: VerifyTokenProps,
    id?: UniqueEntityID,
  ): VerifyTokenEntity {
    return new VerifyTokenEntity(props, id);
  }
}
