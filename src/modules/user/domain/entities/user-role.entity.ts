import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface UserRoleProps extends EntityBaseProps {
  userId: UniqueEntityID;
  roleId: UniqueEntityID;
  assignedAt: Date;
  assignedBy: UniqueEntityID;
  revokedAt?: Date | null;
  revokedBy?: UniqueEntityID | null;
  reason?: string | null;
}

export class UserRoleEntity extends Entity<UserRoleProps> {
  private constructor(props: UserRoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: UserRoleProps, id?: UniqueEntityID): UserRoleEntity {
    return new UserRoleEntity(props, id);
  }

  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get roleId(): UniqueEntityID {
    return this.props.roleId;
  }

  get assignedAt(): Date {
    return this.props.assignedAt;
  }

  get assignedBy(): UniqueEntityID {
    return this.props.assignedBy;
  }

  get revokedAt(): Date | null | undefined {
    return this.props.revokedAt;
  }

  get revokedBy(): UniqueEntityID | null | undefined {
    return this.props.revokedBy;
  }

  get reason(): string | null | undefined {
    return this.props.reason;
  }

  public isRevoked(): boolean {
    return !!this.props.revokedAt;
  }

  public revoke(by: UniqueEntityID, reason?: string): void {
    this.props.revokedAt = new Date();
    this.props.revokedBy = by;
    this.props.reason = reason;
  }

  public reassign(by: UniqueEntityID, reason?: string): void {
    this.props.revokedAt = null;
    this.props.revokedBy = null;
    this.props.reason = reason;
    this.props.assignedAt = new Date();
    this.props.assignedBy = by;
    this.props.updatedAt = new Date();
  }
}
