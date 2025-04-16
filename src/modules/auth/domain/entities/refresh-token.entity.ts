import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface RefreshTokenProps extends EntityBaseProps {
  userId: string;
  token: string;
  expiresAt: Date;
}

export class RefreshTokenEntity extends Entity<RefreshTokenProps> {
  private constructor(props: RefreshTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get token(): string {
    return this.props.token;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() < new Date().getTime();
  }

  static create(
    props: RefreshTokenProps,
    id?: UniqueEntityID,
  ): RefreshTokenEntity {
    return new RefreshTokenEntity(props, id);
  }
}
